import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YeuCauVeXe } from './entities/yeucauvexebuyt.entity';
import { YeuCauVeXeReponse } from './dto/yeucauvexebuyt.response';
import { ThongTinCaNhan } from '../thongtincanhan/entities/thongtincanhan.entity';
import { YeuCauVeXeRequest } from './dto/yeucauvexebuyt.request';
import { LoaiVeHelper } from './enum/loaive.enum';
import { TrangThai } from 'src/common/enum/tranthai.enum';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class YeucauvexebuytService {
  constructor(
    @InjectRepository(YeuCauVeXe)
    private readonly yeuCauVeXeBuytRepository: Repository<YeuCauVeXe>,
    @InjectRepository(ThongTinCaNhan)
    private readonly thongTinCaNhanRepository: Repository<ThongTinCaNhan>,
    private readonly uploadService: UploadService,
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

  async createYeuCau(
    userId: number,
    yeuCauVXB: YeuCauVeXeRequest,
    file: Express.Multer.File,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
  ): Promise<any | null> {
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
    console.log('zzz', LoaiVeHelper.fromLabel(yeuCauVXB.loaiVe));
    console.log('kkk', yeuCauVXB.loaiVe);
    const url = await this.uploadService.uploadImage(file, 'vxb_img');
    const yeuCau = {
      maSinhVien: thongtincanhan.maSinhVien,
      loaiVe: LoaiVeHelper.fromLabel(yeuCauVXB.loaiVe),
      tuyen: yeuCauVXB == null ? 'Liên tuyến' : yeuCauVXB.tuyen,
      soDienThoai: yeuCauVXB.sdt,
      trangThai: TrangThai.DANG_TIEP_NHAN,
      duongDanAnh: url,
      ghiChu: 'Yêu cầu mới tạo. Đang chờ xử lý.',
    } as YeuCauVeXe;
    await this.yeuCauVeXeBuytRepository.save(yeuCau);
  }
}
