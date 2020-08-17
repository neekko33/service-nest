import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { OcrController } from './ocr.controller';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: `/Users/duanjian/Desktop`,
        // TODO:切换为服务器路径
        // destination:'/usr/share/nginx/ocr_files',
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称
          const filename = file.originalname;
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [OcrController],
})
export class OcrModule {}
