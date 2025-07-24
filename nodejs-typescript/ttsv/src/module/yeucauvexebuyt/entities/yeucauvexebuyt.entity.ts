import { TrangThai } from 'src/common/enum/tranthai.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { LoaiVe } from '../enum/loaive.enum';

@Entity({ name: 'yeu_cau_ve_xe' })
export class YeuCauVeXe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ma_sinh_vien', length: 20, nullable: true })
  maSinhVien: string;

  @Column({ name: 'loai_ve', type: 'enum', enum: LoaiVe })
  loaiVe: LoaiVe;

  @Column({ name: 'tuyen', nullable: true })
  tuyen: string;

  @Column({ name: 'so_dien_thoai', length: 15, nullable: true })
  soDienThoai: string;

  @Column({ name: 'duong_dan_anh', length: 255, nullable: true })
  duongDanAnh: string;

  @Column({
    name: 'trang_thai',
    type: 'enum',
    enum: TrangThai,
    default: TrangThai.DANG_TIEP_NHAN,
  })
  trangThai: TrangThai;

  @Column({ name: 'ghi_chu', type: 'text', nullable: true })
  ghiChu?: string;

  @Column({ name: 'ngay_nhan', type: 'date', nullable: true })
  ngayNhan?: Date;

  @Column({ name: 'noi_nhan', length: 255, nullable: true })
  noiNhan?: string;

  @Column({
    name: 'ngay_yeu_cau',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  ngayYeuCau?: Date;

  @Column({ name: 'nguoi_xu_ly', type: 'int', nullable: true })
  nguoiXuLy?: number;
}
