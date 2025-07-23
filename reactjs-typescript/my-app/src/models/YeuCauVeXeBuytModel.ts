export class YeuCauVeXeBuyt {
  key: number;
  id: number;
  tuyen: string;
  ngayTao?: string;
  trangThai: string;
  noiNhan?: string;
  ngayNhan?: string;
  ghiChu?: string;

  constructor(
    key: number,
    id: number,
    tuyen: string,
    trangThai: string,
    ngayTao?: string,
    noiNhan?: string,
    ngayNhan?: string,
    ghiChu?: string
  ) {
    this.key = key;
    this.id = id;
    this.tuyen = tuyen;
    this.ngayTao = ngayTao;
    this.trangThai = trangThai;
    this.noiNhan = noiNhan;
    this.ngayNhan = ngayNhan;
    this.ghiChu = ghiChu;
  }
}
