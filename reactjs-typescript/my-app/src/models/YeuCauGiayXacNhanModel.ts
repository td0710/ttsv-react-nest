export class YeuCauGiayXacNhanModel {
  key: number;
  id: number | string;
  loaiGiay: string;
  ngayTao?: string;
  trangThai: string;
  noiNhan: string;
  ngayNhan?: string;
  ghiChu?: string;

  constructor(data: {
    key: number;
    id: number | string;
    loaiGiay: string;
    ngayTao?: string;
    trangThai: string;
    noiNhan: string;
    ngayNhan?: string;
    ghiChu?: string;
  }) {
    this.key = data.key;
    this.id = data.id;
    this.loaiGiay = data.loaiGiay;
    this.ngayTao = data.ngayTao;
    this.trangThai = data.trangThai;
    this.noiNhan = data.noiNhan;
    this.ngayNhan = data.ngayNhan;
    this.ghiChu = data.ghiChu;
  }
}
