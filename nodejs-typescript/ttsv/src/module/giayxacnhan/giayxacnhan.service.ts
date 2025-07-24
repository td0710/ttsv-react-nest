import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GiayXacNhan } from './entities/giayxacnhan.entity';
import { GiayXacNhanResponse } from './dto/giayxacnhan.response';
import { getLoaiGiayDescription } from './enum/loaigiay.enum';

@Injectable()
export class GiayxacnhanService {
  constructor(
    @InjectRepository(GiayXacNhan)
    private readonly thongTinCaNhanRepository: Repository<GiayXacNhan>,
  ) {}

  async getGiayXacNhan(): Promise<GiayXacNhanResponse[] | null> {
    const listGiayXacNhan = await this.thongTinCaNhanRepository.find();

    console.log(listGiayXacNhan);
    const response = listGiayXacNhan.map((item: GiayXacNhan) => {
      return {
        id: item.id,
        name: getLoaiGiayDescription(item.loaiGiay),
      };
    }) as GiayXacNhanResponse[];
    return response;
  }
}
