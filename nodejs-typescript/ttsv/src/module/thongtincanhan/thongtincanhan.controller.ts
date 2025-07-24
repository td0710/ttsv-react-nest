import {
  Body,
  Controller,
  Get,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ThongtincanhanService } from './thongtincanhan.service';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { UserIdFromCookie } from 'src/common/decorators/user-id-from-cookie.decorator';
import { ThongTinCaNhanRequest } from './interfaces/thongtincanhan.request';

// interface payload {
//   id: number;
//   email: string;
//   role: string;
// }
@Controller('thongtincanhan')
export class ThongtincanhanController {
  constructor(private readonly thongTinCaNhanService: ThongtincanhanService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-thong-tin-ca-nhan')
  getThongTinCaNhan(@UserIdFromCookie() userId: number) {
    console.log(userId);
    if (!userId) throw new UnauthorizedException('Invalid user ID');

    return this.thongTinCaNhanService.getThongTinCaNhan(userId);
  }
  @UseGuards(JwtAuthGuard)
  @Put('update-thong-tin-ca-nhan')
  updateThongTinCaNhan(
    @UserIdFromCookie() userId: number,
    @Body() thongTinCaNhanRequest: ThongTinCaNhanRequest,
  ) {
    console.log(userId);
    if (!userId) throw new UnauthorizedException('Invalid user ID');

    return this.thongTinCaNhanService.updateThongTinCaNhan(
      userId,
      thongTinCaNhanRequest,
    );
  }
}
