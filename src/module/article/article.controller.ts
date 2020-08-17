import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, ArticleListDto } from './create-article.dto';
import { Article } from './article.entity';

@Controller('/api/v5/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  addArticle(@Body() createArticleDto: CreateArticleDto): Promise<void> {
    return this.articleService.create(createArticleDto);
  }
  @Delete(':id')
  deleteArticle(@Param('id') id: string): Promise<void> {
    return this.articleService.delete(id);
  }
  @Put(':id')
  updateArticle(
    @Param('id') id: string,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<void> {
    return this.articleService.update(id, createArticleDto);
  }
  @Get()
  async getArticle(
    @Query('typeId') typeId: string,
    @Query('pageNum') pageNum: number,
    @Query('pageSize') pageSize: number,
  ): Promise<Article[] | ArticleListDto> {
    if (!typeId) {
      const result = await this.articleService.findAll(pageNum, pageSize);
      return {
        articles: result[0],
        count: result[1],
      };
    } else {
      return this.articleService.findType(typeId);
    }
  }
  @Get(':id')
  getArticleById(@Param('id') id: string): Promise<Article> {
    return this.articleService.findId(id);
  }
}
