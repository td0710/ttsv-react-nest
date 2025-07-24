/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import { BadRequestException } from '@nestjs/common';

export enum LoaiVe {
  mot_tuyen = 'motTuyen',
  lien_tuyen = 'lienTuyen',
}

export class LoaiVeHelper {
  private static readonly labelMap: Record<LoaiVe, string> = {
    [LoaiVe.mot_tuyen]: 'motTuyen',
    [LoaiVe.lien_tuyen]: 'lienTuyen',
  };

  static getLabel(loaiVe: LoaiVe): string {
    return this.labelMap[loaiVe] || loaiVe;
  }

  static fromLabel(label: string): LoaiVe {
    const reverseMapping: Record<string, LoaiVe> = {};

    for (const key in LoaiVe) {
      if (isNaN(Number(key))) {
        reverseMapping[LoaiVe[key as keyof typeof LoaiVe]] = key as LoaiVe;
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
