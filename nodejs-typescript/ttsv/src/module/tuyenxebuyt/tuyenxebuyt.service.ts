import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TuyenXeBuyt } from './entities/tuyenxebuyt.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TuyenxebuytService {
  constructor(
    @InjectRepository(TuyenXeBuyt)
    private readonly tuyenXeBuytRepository: Repository<TuyenXeBuyt>,
  ) {}

  async getAllTuyenXe(): Promise<TuyenXeBuyt[] | null> {
    const listTuyenXe = await this.tuyenXeBuytRepository.find();
    return listTuyenXe;
  }
}
