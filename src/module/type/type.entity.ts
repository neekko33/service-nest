import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Article } from '../article/article.entity';

@Entity()
export class Type {
  @PrimaryGeneratedColumn({ comment: '类型id' })
  id: number;

  @Column({ comment: '类型名称' })
  typeName: string;

  @OneToMany(
    type => Article,
    article => article.type,
  )
  articles: Article[];
}
