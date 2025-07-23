import { PhongModel } from "./PhongModel";

export class YeuCauKTXModel {
  id: number;
  loaiYeuCau: string;
  phongHienTai: PhongModel;
  phongMongMuon?: PhongModel;
  trangThai: string;

  constructor(
    id: number,
    loaiYeuCau: string,
    phongHienTai: PhongModel,
    trangThai: string,
    phongMongMuon?: PhongModel
  ) {
    this.id = id;
    this.loaiYeuCau = loaiYeuCau;
    this.phongHienTai = phongHienTai;
    this.trangThai = trangThai;
    this.phongMongMuon = phongMongMuon;
  }
}
