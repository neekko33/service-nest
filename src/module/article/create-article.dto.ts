import { Article } from './article.entity';

export class CreateArticleDto {
  title: string;
  content: string;
  introduce: string;
  addTime: number;
  typeId: number;
  userId: number;
}

export class ArticleListDto {
  articles: Article[];
  count: number;
}
