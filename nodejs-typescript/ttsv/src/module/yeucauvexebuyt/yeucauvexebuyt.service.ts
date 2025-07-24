import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YeuCauVeXe } from './entities/yeucauvexebuyt.entity';
import { YeuCauVeXeReponse } from './dto/yeucauvexebuyt.response';
import { ThongTinCaNhan } from '../thongtincanhan/entities/thongtincanhan.entity';

@Injectable()
export class YeucauvexebuytService {
  constructor(
    @InjectRepository(YeuCauVeXe)
    private readonly yeuCauVeXeBuytRepository: Repository<YeuCauVeXe>,
    @InjectRepository(ThongTinCaNhan)
    private readonly thongTinCaNhanRepository: Repository<ThongTinCaNhan>,
  ) {}

  async getYeuCauVeXeByUserId(
    userId: number,
  ): Promise<YeuCauVeXeReponse[] | null> {
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

    const listYeuCau = await this.yeuCauVeXeBuytRepository.findBy({
      maSinhVien: thongtincanhan.maSinhVien,
    });

    const response = listYeuCau.map((item: YeuCauVeXe) => {
      return YeuCauVeXeReponse.fromEntity(item);
    });
    return response;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async deleteYeuCauVeXe(vxbId: number): Promise<any> {
    return await this.yeuCauVeXeBuytRepository.delete({ id: vxbId });
  }
}
