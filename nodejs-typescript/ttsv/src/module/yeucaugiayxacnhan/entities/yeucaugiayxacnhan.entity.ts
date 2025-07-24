import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LoaiGiay } from 'src/module/giayxacnhan/enum/loaigiay.enum';
import { TrangThai } from 'src/common/enum/tranthai.enum';
@Entity('yeu_cau_giay_xac_nhan')
export class YeuCauGiayXacNhan {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'ma_sinh_vien', nullable: false })
  maSinhVien: string;

  @Column({
    name: 'loai_giay',
    type: 'enum',
    enum: LoaiGiay,
    nullable: false,
  })
  loaiGiay: LoaiGiay;

  @Column({ name: 'ngay_tao', type: 'timestamp', nullable: false })
  ngayTao: Date;

  @Column({
    name: 'trang_thai',
    type: 'enum',
    enum: TrangThai,
    nullable: false,
  })
  trangThai: TrangThai;

  @Column({ name: 'ngay_nhan', type: 'date', nullable: true })
  ngayNhan?: Date;

  @Column({ name: 'noi_nhan', nullable: true })
  noiNhan?: string;

  @Column({ name: 'ghi_chu', type: 'text', nullable: true })
  ghiChu?: string;

  @Column({ name: 'nguoi_xu_ly', nullable: true })
  nguoiXuLy?: number;

  @Column({ name: 'ngay_xu_ly', type: 'timestamp', nullable: true })
  ngayXuLy?: Date;
}
