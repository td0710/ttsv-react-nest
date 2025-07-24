/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

export enum LoaiGiay {
  UU_DAI_GIAO_DUC = 'Giấy xác nhận sinh viên để nhận ưu đãi giáo dục',
  VAY_VON = 'Giấy xác nhận sinh viên để vay vốn tại NHCSXH địa phương',
  CA_NHAN = 'Giấy xác nhận sinh viên để giải quyết các vấn đề cá nhân khác',
  DANG_KY_XE = 'Giấy giới thiệu đăng ký xe máy',
}
export function getLoaiGiayDescription(
  input: LoaiGiay | keyof typeof LoaiGiay,
): string {
  if (typeof input === 'string') {
    return LoaiGiay[input];
  }
  return input;
}
export function getKey(value: string): keyof typeof LoaiGiay | undefined {
  return (Object.keys(LoaiGiay) as Array<keyof typeof LoaiGiay>).find(
    (k) => LoaiGiay[k] === value,
  );
}
