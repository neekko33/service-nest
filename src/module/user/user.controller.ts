import {
  Controller,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import {
  CreateUserDto,
  LoginDto,
  PasswordChangeDto,
  UpdateUserDto,
} from './create_user.dto';

@Controller('/api/v5/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 获取用户列表
  @Get('user')
  async getUserList(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // 获取指定用户信息
  @Get('user/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    try {
      return await this.userService.findOne(id);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // 新增用户
  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    try {
      await this.userService.create(createUserDto);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // 删除用户
  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    try {
      await this.userService.delete(id);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 修改用户信息
  @Put('user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    try {
      await this.userService.update(id, updateUserDto);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // 用户登陆
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<User | Error> {
    try {
      const result = await this.userService.login(loginDto);
      if (!result) {
        throw new HttpException('登陆失败', HttpStatus.EXPECTATION_FAILED);
      } else {
        return result;
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // 修改密码
  @Put('password/:id')
  async changePassword(
    @Param('id') id: string,
    @Body() passwordChangeDto: PasswordChangeDto,
  ): Promise<void> {
    try {
      const {
        raw: { changedRows },
      } = await this.userService.changePassword(id, passwordChangeDto);
      if (!changedRows) {
        throw new HttpException('密码修改失败', HttpStatus.EXPECTATION_FAILED);
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
