import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import Users from '../../user/user.entity';

@Entity('sinh_vien')
export class ThongTinCaNhan {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ name: 'ma_sinh_vien', unique: true, length: 20, nullable: true })
  maSinhVien: string;

  @Column({ name: 'ho_ten', length: 100, nullable: true })
  hoTen: string;

  @Column({ length: 50, nullable: true })
  khoa: string;

  @Column({ name: 'dan_toc', length: 50, nullable: true })
  danToc: string;

  @Column({ name: 'ton_giao', length: 50, nullable: true })
  tonGiao: string;

  @Column({ name: 'quoc_tich', length: 50, nullable: true })
  quocTich: string;

  @Column({ length: 12, nullable: true })
  cccd: string;

  @Column({ name: 'cccd_ngay_cap', type: 'date', nullable: true })
  cccdNgayCap: Date;

  @Column({ name: 'cccd_noi_cap', length: 100, nullable: true })
  cccdNoiCap: string;

  @Column({ name: 'ngay_sinh', type: 'date', nullable: true })
  ngaySinh: Date;

  @Column({ name: 'noi_sinh', length: 100, nullable: true })
  noiSinh: string;

  @Column({
    name: 'gioi_tinh',
    type: 'enum',
    enum: ['Nam', 'Nữ'],
    nullable: true,
  })
  gioiTinh: 'Nam' | 'Nữ';

  @Column({ name: 'que_quan', length: 100, nullable: true })
  queQuan: string;

  @Column({ name: 'so_dien_thoai', length: 15, nullable: true })
  soDienThoai: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ name: 'ho_khau_thanh_pho', length: 100, nullable: true })
  hoKhauThanhPho: string;

  @Column({ name: 'ho_khau_huyen', length: 100, nullable: true })
  hoKhauHuyen: string;

  @Column({ name: 'ho_khau_xa', length: 100, nullable: true })
  hoKhauXa: string;

  @Column({ name: 'dia_chi_bao_tin', length: 255, nullable: true })
  diaChiBaoTin: string;

  @Column({ name: 'so_dien_thoai_gia_dinh', length: 15, nullable: true })
  soDienThoaiGiaDinh: string;

  @Column({ length: 20, nullable: true })
  lop: string;

  @Column({ name: 'cccd_nguoi_giam_ho', length: 12, nullable: true })
  cccdNguoiGiamHo: string;

  @Column({ name: 'ma_bao_hiem_y_te', length: 15, nullable: true })
  maBaoHiemYTe: string;

  @Column({ name: 'ma_bao_hiem_xa_hoi', length: 15, nullable: true })
  maBaoHiemXaHoi: string;

  @Column({ name: 'ten_bo', length: 100, nullable: true })
  tenBo: string;

  @Column({ name: 'nam_sinh_bo', length: 4, nullable: true })
  namSinhBo: string;

  @Column({ name: 'nghe_nghiep_bo', length: 100, nullable: true })
  ngheNghiepBo: string;

  @Column({ name: 'noi_lam_viec_bo', length: 100, nullable: true })
  noiLamViecBo: string;

  @Column({ name: 'so_dien_thoai_bo', length: 15, nullable: true })
  soDienThoaiBo: string;

  @Column({ name: 'ten_me', length: 100, nullable: true })
  tenMe: string;

  @Column({ name: 'nam_sinh_me', length: 4, nullable: true })
  namSinhMe: string;

  @Column({ name: 'nghe_nghiep_me', length: 100, nullable: true })
  ngheNghiepMe: string;

  @Column({ name: 'noi_lam_viec_me', length: 100, nullable: true })
  noiLamViecMe: string;

  @Column({ name: 'so_dien_thoai_me', length: 15, nullable: true })
  soDienThoaiMe: string;

  @UpdateDateColumn({
    name: 'ngay_cap_nhat',
    type: 'timestamp',
    nullable: true,
  })
  ngayCapNhat: Date;
}
