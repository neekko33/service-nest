import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { YysTV } from './yysTV.entity';
import { Repository } from 'typeorm';

@Injectable()
export class YysTVService {
  constructor(
    @InjectRepository(YysTV)
    private readonly yysTVRepository: Repository<YysTV>,
  ) {}
  async findAll(): Promise<YysTV[]> {
    try {
      return await this.yysTVRepository.find();
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
