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

    Object.keys(LoaiVe).forEach((key) => {
      const enumKey = key as keyof typeof LoaiVe;
      const enumValue = LoaiVe[enumKey];
      reverseMapping[this.labelMap[enumValue]] = enumValue;
    });

    const normalizedLabel = label.trim();
    const foundValue = Object.keys(reverseMapping).find(
      (k) => k === normalizedLabel,
    );

    if (foundValue) {
      return reverseMapping[foundValue];
    }

    throw new BadRequestException(
      `Không tìm thấy loại vé phù hợp với: "${label}"`,
    );
  }
}
