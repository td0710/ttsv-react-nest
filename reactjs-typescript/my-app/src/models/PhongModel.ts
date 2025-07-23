import { TienIchModel } from "./TienIchModel";

export class PhongModel {
  id: number;
  tenPhong: string;
  loaiPhong: string;
  soSv: number;
  gia: number;
  soLuongDaDangKy: number;
  tienIchList: TienIchModel[];

  constructor(
    id: number,
    tenPhong: string,
    loaiPhong: string,
    soSv: number,
    gia: number,
    soLuongDaDangKy: number,
    tienIchList: TienIchModel[]
  ) {
    this.id = id;
    this.tenPhong = tenPhong;
    this.loaiPhong = loaiPhong;
    this.soSv = soSv;
    this.gia = gia;
    this.soLuongDaDangKy = soLuongDaDangKy;
    this.tienIchList = tienIchList;
  }
}
