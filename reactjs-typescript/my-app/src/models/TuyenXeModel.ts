export class TuyenXeModel {
  id: number;
  ten: string;
  maTuyen: string;

  constructor(id: number, name: string, maTuyen: string) {
    this.id = id;
    this.ten = name;
    this.maTuyen = maTuyen;
  }
}
