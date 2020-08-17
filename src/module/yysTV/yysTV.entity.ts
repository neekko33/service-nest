import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class YysTV {
  @PrimaryGeneratedColumn({ comment: '主键id' })
  id: number;

  @Column({ type: 'text', comment: '文章标题' })
  title: string;

  @Column({ type: 'text', comment: '文章地址' })
  href: string;

  @Column({ type: 'text', comment: '背景图地址' })
  bg: string;
}
