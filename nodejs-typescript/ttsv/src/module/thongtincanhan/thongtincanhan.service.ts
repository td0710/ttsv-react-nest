import { Injectable } from '@nestjs/common';
import { ThongTinCaNhan } from './entities/thongtincanhan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ThongTinCaNhanResponse } from './interfaces/thongtincanhan.response';
import { ThongTinCaNhanRequest } from './interfaces/thongtincanhan.request';

@Injectable()
export class ThongtincanhanService {
  constructor(
    @InjectRepository(ThongTinCaNhan)
    private readonly thongTinCaNhanRepository: Repository<ThongTinCaNhan>,
  ) {}
  async getThongTinCaNhan(
    userId: number,
  ): Promise<ThongTinCaNhanResponse | null> {
    const thongtincanhan = await this.thongTinCaNhanRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
    if (!thongtincanhan) {
      throw new Error('Thông tin cá nhân không tồn tại');
    }

    return ThongTinCaNhanResponse.fromEntity(thongtincanhan);
  }
  async updateThongTinCaNhan(
    userId: number,
    thongTinCaNhanRequest: ThongTinCaNhanRequest,
  ): Promise<ThongTinCaNhanRequest | null> {
    const thongtincanhan = await this.thongTinCaNhanRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
    if (!thongtincanhan) {
      throw new Error('Thông tin cá nhân không tồn tại');
    }
    Object.assign(thongtincanhan, {
      ...thongTinCaNhanRequest,
      cccdNgayCap: new Date(thongTinCaNhanRequest.cccdNgayCap)
        .toISOString()
        .split('T')[0],
      ngaySinh: new Date(thongTinCaNhanRequest.ngaySinh)
        .toISOString()
        .split('T')[0],
    });

    return await this.thongTinCaNhanRepository.save(thongtincanhan);
  }
}
