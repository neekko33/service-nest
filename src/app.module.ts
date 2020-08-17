import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { YysTVModule } from './module/yysTV/yysTV.module';
import { TypeModule } from './module/type/type.module';
import { ArticleModule } from './module/article/article.module';
import { FileModule } from './module/file/file.module';
import { OcrModule } from './module/ocr/ocr.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '212.64.78.155',
      port: 3306,
      username: 'root',
      password: 'Dj.249575',
      database: 'mwwow',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    YysTVModule,
    TypeModule,
    ArticleModule,
    FileModule,
    OcrModule,
  ],
})
export class AppModule {}
