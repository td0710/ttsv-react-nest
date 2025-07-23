export class FileDinhKemModel {
  id: number;
  tenFile: string;
  duongDan: string;
  ngayTao: string;

  constructor(id: number, tenFile: string, duongDan: string, ngayTao: string) {
    this.id = id;
    this.tenFile = tenFile;
    this.ngayTao = ngayTao;
    this.duongDan = duongDan;
  }
}
