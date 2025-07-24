import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { LoaiGiay } from '../enum/loaigiay.enum';
@Entity({ name: 'giay_xac_nhan' })
export class GiayXacNhan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'loai_giay',
    type: 'enum',
    enum: LoaiGiay,
  })
  loaiGiay: LoaiGiay;
}
