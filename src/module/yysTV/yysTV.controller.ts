import { Controller, Get } from '@nestjs/common';
import { YysTVService } from './yysTV.service';
import { YysTV } from './yysTV.entity';

@Controller('/yysTV')
export class YysTVController {
  constructor(private readonly yysTVService: YysTVService) {}
  @Get()
  getYysTV(): Promise<YysTV[]> {
    return this.yysTVService.findAll();
  }
}
