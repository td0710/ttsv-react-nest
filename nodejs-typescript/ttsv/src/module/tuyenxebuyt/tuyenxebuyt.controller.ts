import { Controller, Get, UseGuards } from '@nestjs/common';
import { TuyenxebuytService } from './tuyenxebuyt.service';
import { JwtAuthGuard } from 'src/guards/jwt.guards';

@Controller('tuyenxebuyt')
export class TuyenxebuytController {
  constructor(private readonly tuyenXeBuytService: TuyenxebuytService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-tuyen-xe')
  async getTuyenXe() {
    const listTuyenXe = await this.tuyenXeBuytService.getAllTuyenXe();
    return listTuyenXe;
  }
}
