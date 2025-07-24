import { TrangThaiHelper } from 'src/common/enum/tranthai.enum';
import { YeuCauVeXe } from '../entities/yeucauvexebuyt.entity';

export class YeuCauVeXeReponse {
  id: number;

  ngayTao?: Date;

  tuyen: string;

  trangThai: string;

  ghiChu?: string;

  ngayNhan?: Date;

  noiNhan?: string;

  static fromEntity(entity: YeuCauVeXe): YeuCauVeXeReponse {
    return {
      id: entity.id,
      ngayTao: entity.ngayYeuCau,
      tuyen: entity.tuyen,
      trangThai: TrangThaiHelper.getLabel(entity.trangThai),
      ngayNhan: entity.ngayNhan,
      noiNhan: entity.noiNhan,
      ghiChu: entity.ghiChu,
    };
  }
}
