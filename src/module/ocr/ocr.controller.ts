import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as tencentcloud from 'tencentcloud-sdk-nodejs';

@Controller()
export class OcrController {
  @Post('/api/v5/ocr')
  @UseInterceptors(FilesInterceptor('files'))
  upload(@UploadedFiles() files): any {
    console.log(JSON.stringify(files));
    const resultList = [];
    const baseUrl = '/Users/duanjian/Desktop/';
    // const baseUrl = '/usr/share/nginx/ocr_files';
    const OcrClient = tencentcloud.ocr.v20181119.Client;
    const models = tencentcloud.ocr.v20181119.Models;

    const { Credential } = tencentcloud.common;
    const { ClientProfile } = tencentcloud.common;
    const { HttpProfile } = tencentcloud.common;

    const cred = new Credential(
      'AKID3rPgh9FEqCH6eva2pLbooYuznLbbjgNp',
      'KNAfPt74BP8bopZ3GKNgiATM2SdYCbsH',
    );
    const httpProfile = new HttpProfile();
    httpProfile.endpoint = 'ocr.tencentcloudapi.com';
    const clientProfile = new ClientProfile();
    clientProfile.httpProfile = httpProfile;
    const client = new OcrClient(cred, 'ap-shanghai', clientProfile);

    const req = new models.VatInvoiceOCRRequest();
    return new Promise(resolve => {
      files.map(file => {
        const path = baseUrl + file.filename;
        const imageData = require('fs').readFileSync(path);
        const imageBase64 = imageData.toString('base64');
        const params = `{"ImageBase64":"${imageBase64}"}`;
        req.from_json_string(params);
        client.VatInvoiceOCR(req, (errMsg, response) => {
          if (errMsg) {
            console.log(errMsg);
            return;
          }
          const result = response;
          resultList.push(result);
          if (resultList.length === files.length) {
            resolve(resultList);
          }
        });
      });
    });
  }
}
