import { Controller, Get, UseGuards } from '@nestjs/common';
import { YeucaugiayxacnhanService } from './yeucaugiayxacnhan.service';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { UserIdFromCookie } from 'src/common/decorators/user-id-from-cookie.decorator';

@Controller('yeucaugiayxacnhan')
export class YeucaugiayxacnhanController {
  constructor(
    private readonly yeuCauGiayXacNhanService: YeucaugiayxacnhanService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-yeu-cau-by-id')
  async getYeuCauById(@UserIdFromCookie() userId: number) {
    return await this.yeuCauGiayXacNhanService.getAllYeuCauById(userId);
  }
}
