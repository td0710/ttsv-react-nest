import {
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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
  @UseGuards(JwtAuthGuard)
  @Delete('huy-yeu-cau')
  async huyYeuCau(@Query('id') id: number) {
    await this.yeuCauGiayXacNhanService.huyYeuCau(id);
    return 'Hủy yêu cầu thành công';
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-yeu-cau')
  async createYeuCau(
    @Query('loaiGiay') loaiGiay: string,
    @UserIdFromCookie() userId: number,
  ) {
    await this.yeuCauGiayXacNhanService.createYeuCau(userId, loaiGiay);
    return 'Tạo yêu cầu thành công';
  }
}
