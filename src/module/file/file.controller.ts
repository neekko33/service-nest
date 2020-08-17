import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class FileController {
  @Post('/api/v5/file')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    return {
      path: 'http://212.64.78.155/images/' + file.filename,
    };
  }
}
