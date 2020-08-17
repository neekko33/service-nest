import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Type } from '../type/type.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn({ comment: '文章id' })
  id: number;

  @Column({ comment: '文章标题' })
  title: string;

  @Column({ comment: '文章内容', type: 'text' })
  content?: string;

  @Column({ comment: '文章介绍', type: 'text' })
  introduce: string;

  @Column({ type: 'bigint', comment: '文章时间' })
  addTime: number;

  @Column({ comment: '类型id' })
  typeId: number;

  @Column({ comment: '用户id' })
  userId: number;

  @ManyToOne(
    type => User,
    user => user.articles,
  )
  user: User;

  @ManyToOne(
    type => Type,
    type => type.articles,
  )
  type: Type;
}
