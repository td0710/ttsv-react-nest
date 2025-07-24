import { Controller, Get, UseGuards } from '@nestjs/common';
import { GiayxacnhanService } from './giayxacnhan.service';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { GiayXacNhanResponse } from './dto/giayxacnhan.response';

@Controller('giayxacnhan')
export class GiayxacnhanController {
  constructor(private readonly giayXacNhanService: GiayxacnhanService) {}

  @Get('get-giay-xac-nhan')
  @UseGuards(JwtAuthGuard)
  async getGiayXacNhan() {
    const listGiayXacNhan =
      (await this.giayXacNhanService.getGiayXacNhan()) as GiayXacNhanResponse[];

    return listGiayXacNhan;
  }
}
