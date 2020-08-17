import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YysTV } from './yysTV.entity';
import { YysTVService } from './yysTV.service';
import { YysTVController } from './yysTV.controller';

@Module({
  imports: [TypeOrmModule.forFeature([YysTV])],
  providers: [YysTVService],
  controllers: [YysTVController],
})
export class YysTVModule {}
