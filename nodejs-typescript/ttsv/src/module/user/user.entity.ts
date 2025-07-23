import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum UserRole {
  SINH_VIEN = 'sinh_vien',
  ADMIN = 'admin',
}
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  microsoft_id: string;

  @Column({ type: 'varchar', length: 255 })
  full_name: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.SINH_VIEN })
  role: UserRole;

  @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
  createdDate: Date;
}
