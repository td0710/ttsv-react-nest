import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({ name: 'tuyen_xe' })
export class TuyenXeBuyt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'ten',
  })
  ten: string;

  @Column({
    name: 'ma_tuyen',
  })
  maTuyen: string;
}
