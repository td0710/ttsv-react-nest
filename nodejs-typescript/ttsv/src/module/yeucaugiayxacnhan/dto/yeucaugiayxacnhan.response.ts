import { getLoaiGiayDescription } from 'src/module/giayxacnhan/enum/loaigiay.enum';
import { YeuCauGiayXacNhan } from '../entities/yeucaugiayxacnhan.entity';
import { TrangThaiHelper } from 'src/common/enum/tranthai.enum';

export class YeuCauGiayXacNhanResponse {
  id: number;
  loaiGiay: string;
  ngayTao: Date;
  trangThai: string;
  ngayNhan?: Date;
  noiNhan?: string;
  ghiChu?: string;

  static fromEntity(entity: YeuCauGiayXacNhan): YeuCauGiayXacNhanResponse {
    return {
      id: entity.id,
      loaiGiay: getLoaiGiayDescription(entity.loaiGiay),
      ngayTao: entity.ngayTao,
      trangThai: TrangThaiHelper.getLabel(entity.trangThai),
      ngayNhan: entity.ngayNhan,
      noiNhan: entity.noiNhan,
      ghiChu: entity.ghiChu,
    };
  }
}
