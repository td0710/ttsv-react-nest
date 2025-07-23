import { ThongTinCaNhan } from '../entities/thongtincanhan.entity';

export class ThongTinCaNhanResponse {
  maSinhVien: string;
  hoTen: string;
  khoa: string;
  danToc: string;
  tonGiao: string;
  quocTich: string;
  cccd: string;
  cccdNgayCap: Date;
  cccdNoiCap: string;
  ngaySinh: Date;
  noiSinh: string;
  gioiTinh: string;
  queQuan: string;
  soDienThoai: string;
  email: string;
  hoKhauThanhPho: string;
  hoKhauHuyen: string;
  hoKhauXa: string;
  diaChiBaoTin: string;
  soDienThoaiGiaDinh: string;
  lop: string;
  cccdNguoiGiamHo: string;
  maBaoHiemYTe: string;
  maBaoHiemXaHoi: string;
  tenBo: string;
  namSinhBo: string;
  ngheNghiepBo: string;
  noiLamViecBo: string;
  soDienThoaiBo: string;
  tenMe: string;
  namSinhMe: string;
  ngheNghiepMe: string;
  noiLamViecMe: string;
  soDienThoaiMe: string;
  ngayCapNhat: Date;
  static fromEntity(entity: ThongTinCaNhan): ThongTinCaNhanResponse {
    return {
      maSinhVien: entity.maSinhVien,
      hoTen: entity.hoTen,
      khoa: entity.khoa,
      danToc: entity.danToc,
      tonGiao: entity.tonGiao,
      quocTich: entity.quocTich,
      cccd: entity.cccd,
      cccdNgayCap: entity.cccdNgayCap,
      cccdNoiCap: entity.cccdNoiCap,
      ngaySinh: entity.ngaySinh,
      noiSinh: entity.noiSinh,
      gioiTinh: entity.gioiTinh,
      queQuan: entity.queQuan,
      soDienThoai: entity.soDienThoai,
      email: entity.email,
      hoKhauThanhPho: entity.hoKhauThanhPho,
      hoKhauHuyen: entity.hoKhauHuyen,
      hoKhauXa: entity.hoKhauXa,
      diaChiBaoTin: entity.diaChiBaoTin,
      soDienThoaiGiaDinh: entity.soDienThoaiGiaDinh,
      lop: entity.lop,
      cccdNguoiGiamHo: entity.cccdNguoiGiamHo,
      maBaoHiemYTe: entity.maBaoHiemYTe,
      maBaoHiemXaHoi: entity.maBaoHiemXaHoi,
      tenBo: entity.tenBo,
      namSinhBo: entity.namSinhBo,
      ngheNghiepBo: entity.ngheNghiepBo,
      noiLamViecBo: entity.noiLamViecBo,
      soDienThoaiBo: entity.soDienThoaiBo,
      tenMe: entity.tenMe,
      namSinhMe: entity.namSinhMe,
      ngheNghiepMe: entity.ngheNghiepMe,
      noiLamViecMe: entity.noiLamViecMe,
      soDienThoaiMe: entity.soDienThoaiMe,
      ngayCapNhat: entity.ngayCapNhat,
    };
  }
}
