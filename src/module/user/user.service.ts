import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import {
  CreateUserDto,
  LoginDto,
  PasswordChangeDto,
  UpdateUserDto,
} from './create_user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // 查找所有用户
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // 查找目标用户
  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  // 新增用户
  async create(u: CreateUserDto): Promise<void> {
    console.log(JSON.stringify(u));
    await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        username: () => `"${u.username}"`,
        password: () => `MD5("${u.password}")`,
        avatar: () => `"${u.avatar}"`,
        nickname: () => `"${u.nickname}"`,
        tags: () => `"${u.tags}"`,
        address: () => `"${u.address}"`,
        introduce: () => `"${u.introduce}"`,
      })
      .execute();
  }

  // 删除用户
  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // 修改用户信息
  async update(id: string, u: UpdateUserDto): Promise<void> {
    const { nickname, address, tags, introduce } = u;
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({
        nickname,
        address,
        tags,
        introduce,
      })
      .where('id=:id', { id })
      .execute();
  }

  // 用户登录
  async login(u: LoginDto): Promise<User> {
    const { username, password } = u;
    return await this.usersRepository
      .createQueryBuilder('u')
      .where('u.username=:username', { username })
      .andWhere('u.password=MD5(:password)', { password })
      .getOne();
  }

  // 修改密码
  async changePassword(
    id: string,
    u: PasswordChangeDto,
  ): Promise<UpdateResult> {
    const { password, newPassword } = u;
    return await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ password: newPassword })
      .where('user.id=:id', { id })
      .andWhere('user.password=MD5(:password)', { password })
      .execute();
  }
}
