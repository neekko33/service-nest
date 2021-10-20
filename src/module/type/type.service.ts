import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './type.entity';
import { Repository } from 'typeorm';
import Any = jasmine.Any;

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}
  // 新增类型
  async create(typeName: string): Promise<void> {
    await this.typeRepository
      .createQueryBuilder()
      .insert()
      .into(Type)
      .values({ typeName })
      .execute();
  }
  // 删除类型
  async delete(id: string): Promise<void> {
    await this.typeRepository.delete(id);
  }
  // 修改类型
  async update(id: string, typeName: string): Promise<void> {
    await this.typeRepository
      .createQueryBuilder()
      .update(Type)
      .set({
        typeName,
      })
      .where('id=:id', { id })
      .execute();
  }
  // 查找全部类型
  async findAll(): Promise<Type[]> {
    // return await this.typeRepository.find();
    return await this.typeRepository
      .createQueryBuilder('t')
      .leftJoin('t.articles','a')
      .select(['t.id','t.typeName','a.title'])
      .getMany();
  }
}
