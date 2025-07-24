import { GiayXacNhan } from '../entities/giayxacnhan.entity';

export class GiayXacNhanResponse {
  id: number;
  name: string;

  static fromEntity(entity: GiayXacNhan): GiayXacNhanResponse {
    return {
      id: entity.id,
      name: entity.loaiGiay,
    };
  }
}
