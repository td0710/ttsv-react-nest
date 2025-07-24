import { Injectable } from '@nestjs/common';
import { YeuCauGiayXacNhan } from './entities/yeucaugiayxacnhan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YeuCauGiayXacNhanResponse } from './dto/yeucaugiayxacnhan.response';
import { ThongTinCaNhan } from '../thongtincanhan/entities/thongtincanhan.entity';
import { TrangThaiHelper } from 'src/common/enum/tranthai.enum';
import { getLoaiGiayDescription } from '../giayxacnhan/enum/loaigiay.enum';

@Injectable()
export class YeucaugiayxacnhanService {
  constructor(
    @InjectRepository(YeuCauGiayXacNhan)
    private readonly yeuCauGiayXacNhanRepository: Repository<YeuCauGiayXacNhan>,
    @InjectRepository(ThongTinCaNhan)
    private readonly thongTinCaNhanRepository: Repository<ThongTinCaNhan>,
  ) {}

  async getAllYeuCauById(
    userId: number,
  ): Promise<YeuCauGiayXacNhanResponse[] | null> {
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
    const listYeuCau = await this.yeuCauGiayXacNhanRepository.findBy({
      maSinhVien: thongtincanhan.maSinhVien,
    });

    const response = listYeuCau.map((item: YeuCauGiayXacNhan) => {
      return {
        id: item.id,
        loaiGiay: getLoaiGiayDescription(item.loaiGiay),
        ngayTao: item.ngayTao,
        trangThai: TrangThaiHelper.getLabel(item.trangThai),
        ngayNhan: item.ngayNhan,
        noiNhan: item.noiNhan,
        ghiChu: item.ghiChu,
      };
    });
    return response;
  }
}
