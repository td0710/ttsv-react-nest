/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import { BadRequestException } from '@nestjs/common';

export enum LoaiGiay {
  UU_DAI_GIAO_DUC = 'Giấy xác nhận sinh viên để nhận ưu đãi giáo dục',
  VAY_VON = 'Giấy xác nhận sinh viên để vay vốn tại NHCSXH địa phương',
  CA_NHAN = 'Giấy xác nhận sinh viên để giải quyết các vấn đề cá nhân khác',
  DANG_KY_XE = 'Giấy giới thiệu đăng ký xe máy',
}

export class LoaiGiayHelper {
  private static readonly labelMap: Record<LoaiGiay, string> = {
    [LoaiGiay.UU_DAI_GIAO_DUC]:
      'Giấy xác nhận sinh viên để nhận ưu đãi giáo dục',
    [LoaiGiay.VAY_VON]:
      'Giấy xác nhận sinh viên để vay vốn tại NHCSXH địa phương',
    [LoaiGiay.CA_NHAN]:
      'Giấy xác nhận sinh viên để giải quyết các vấn đề cá nhân khác',
    [LoaiGiay.DANG_KY_XE]: 'Giấy giới thiệu đăng ký xe máy',
  };

  static getLabel(loaiGiay: LoaiGiay): string {
    return this.labelMap[loaiGiay] || loaiGiay;
  }

  static fromLabel(label: string): LoaiGiay {
    const reverseMapping: Record<string, LoaiGiay> = {};

    for (const key in LoaiGiay) {
      if (isNaN(Number(key))) {
        reverseMapping[LoaiGiay[key as keyof typeof LoaiGiay]] =
          key as LoaiGiay;
      }
    }

    const normalizedLabel = label.trim().toLowerCase();
    const foundKey = Object.keys(reverseMapping).find(
      (k) => k.toLowerCase() === normalizedLabel,
    );

    if (foundKey) {
      return reverseMapping[foundKey];
    }

    throw new BadRequestException(
      `Không tìm thấy loại giấy phù hợp với: "${label}"`,
    );
  }
}
