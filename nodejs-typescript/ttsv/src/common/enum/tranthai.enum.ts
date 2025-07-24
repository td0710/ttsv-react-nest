import { BadRequestException } from '@nestjs/common';

export enum TrangThai {
  DANG_TIEP_NHAN = 'DangTiepNhan',
  DA_TIEP_NHAN = 'DaTiepNhan',
  HOAN_THANH = 'HoanThanh',
  TU_CHOI = 'TuChoi',
}

export class TrangThaiHelper {
  private static readonly labelMap: Record<TrangThai, string> = {
    [TrangThai.DANG_TIEP_NHAN]: 'Đang tiếp nhận',
    [TrangThai.DA_TIEP_NHAN]: 'Đã tiếp nhận',
    [TrangThai.HOAN_THANH]: 'Hoàn thành',
    [TrangThai.TU_CHOI]: 'Từ chối',
  };

  static getLabel(trangThai: TrangThai): string {
    return this.labelMap[trangThai] || trangThai;
  }

  static fromLabel(label: string): TrangThai {
    const found = Object.entries(this.labelMap).find(
      ([, value]) => value.toLowerCase() === label.toLowerCase(),
    );

    if (!found) {
      throw new BadRequestException('Trạng thái không hợp lệ');
    }

    return found[0] as TrangThai;
  }
}
