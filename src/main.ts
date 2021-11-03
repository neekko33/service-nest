import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

async function main() {
  // 限制跨域请求
  const app = await NestFactory.create(AppModule, { cors: false });
  // 设置路径前缀
  app.setGlobalPrefix('api/v5');
  // 防止跨站脚本攻击
  app.use(helmet());
  // CSRF保护
  app.use(csurf());
  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(7007);
}

main();
