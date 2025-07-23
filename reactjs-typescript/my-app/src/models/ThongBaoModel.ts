import { FileDinhKemModel } from "./FileDinhKemModel";

export class ThongBaoModel {
  id: number;
  tieuDe: string;
  nguoiDang: string;
  ngayDang: string;
  noiDung: string;
  danhSachFileDinhKem?: FileDinhKemModel[];

  constructor(
    id: number,
    tieuDe: string,
    nguoiDang: string,
    ngayDang: string,
    noiDung: string,
    danhSachFileDinhKem?: FileDinhKemModel[]
  ) {
    this.id = id;
    this.tieuDe = tieuDe;
    this.nguoiDang = nguoiDang;
    this.ngayDang = ngayDang;
    this.noiDung = noiDung;
    this.danhSachFileDinhKem = danhSachFileDinhKem;
  }
}
