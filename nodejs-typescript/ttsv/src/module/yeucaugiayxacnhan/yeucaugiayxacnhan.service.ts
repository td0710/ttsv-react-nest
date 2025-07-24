import { Injectable } from '@nestjs/common';
import { YeuCauGiayXacNhan } from './entities/yeucaugiayxacnhan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YeuCauGiayXacNhanResponse } from './dto/yeucaugiayxacnhan.response';
import { ThongTinCaNhan } from '../thongtincanhan/entities/thongtincanhan.entity';
import { TrangThai, TrangThaiHelper } from 'src/common/enum/tranthai.enum';
import { LoaiGiay, LoaiGiayHelper } from '../giayxacnhan/enum/loaigiay.enum';

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
        loaiGiay: LoaiGiayHelper.getLabel(item.loaiGiay),
        ngayTao: item.ngayTao,
        trangThai: TrangThaiHelper.getLabel(item.trangThai),
        ngayNhan: item.ngayNhan,
        noiNhan: item.noiNhan,
        ghiChu: item.ghiChu,
      };
    });
    return response;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
  async huyYeuCau(gxnId: number): Promise<any | null> {
    return await this.yeuCauGiayXacNhanRepository.delete({ id: gxnId });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
  async createYeuCau(userId: number, loaiGiay: string): Promise<any | null> {
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

    console.log(LoaiGiayHelper.fromLabel(LoaiGiay.CA_NHAN));
    const yeuCauGiayXacNhan = {
      maSinhVien: thongtincanhan.maSinhVien,
      loaiGiay: LoaiGiayHelper.fromLabel(loaiGiay),
      trangThai: TrangThai.DANG_TIEP_NHAN,
      ghiChu: 'Yêu cầu mới tạo. Đang chờ xử lý.',
    } as YeuCauGiayXacNhan;

    await this.yeuCauGiayXacNhanRepository.save(yeuCauGiayXacNhan);
  }
}
