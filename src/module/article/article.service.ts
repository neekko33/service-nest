import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Article } from './article.entity';
import { CreateArticleDto } from './create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {
  }

  // 新增文章
  async create(a: CreateArticleDto): Promise<void> {
    const { typeId, title, content, introduce, addTime, userId } = a;
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Article)
        .values([
          {
            typeId,
            title,
            content,
            introduce,
            addTime,
            userId,
          },
        ])
        .execute();
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 删除文章
  async delete(id: string): Promise<void> {
    try {
      await this.articleRepository.delete(id);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 修改文章
  async update(id: string, a: CreateArticleDto): Promise<void> {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Article)
        .set({
          typeId: a.typeId,
          title: a.title,
          content: a.content,
          introduce: a.introduce,
          addTime: a.addTime,
          userId: a.userId,
        })
        .where('id = :id', { id: id })
        .execute();
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 查找全部文章
  async findAll(pageNum: number, pageSize: number): Promise<[Article[], number]> {
    try {
      return await this.articleRepository
        .createQueryBuilder('a')
        .leftJoin('a.user', 'u')
        .leftJoin('a.type', 't')
        .orderBy('a.id', 'DESC')
        .skip(pageSize * (pageNum - 1))
        .take(pageSize)
        .select([
          'a.id',
          'a.title',
          'a.introduce',
          'a.addTime',
          'u.id',
          'u.username',
          't.id',
          't.typeName',
        ])
        .getManyAndCount();
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 通过ID查找文章
  async findId(id: string): Promise<Article> {
    try {
      return await this.articleRepository
        .createQueryBuilder('a')
        .leftJoinAndSelect('a.user', 'u')
        .leftJoinAndSelect('a.type', 't')
        .where('a.id=:id', { id })
        .getOne();
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 通过类型查找文章
  async findType(id: string, pageNum: number, pageSize: number): Promise<[Article[], number]> {
    try {
      return await this.articleRepository
        .createQueryBuilder('a')
        .leftJoin('a.user', 'u')
        .leftJoin('a.type', 't')
        .where('a.typeId=:id', { id })
        .orderBy('a.id', 'DESC')
        .skip(pageSize * (pageNum - 1))
        .take(pageSize)
        .select([
          'a.id',
          'a.title',
          'a.introduce',
          'a.addTime',
          'u.id',
          'u.username',
          't.id',
          't.typeName',
        ])
        .getManyAndCount();
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
