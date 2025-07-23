import {
  Controller,
  Get,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ThongtincanhanService } from './thongtincanhan.service';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { UserIdFromCookie } from 'src/common/decorators/user-id-from-cookie.decorator';

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
  logoutRes(@UserIdFromCookie() userId: number) {
    console.log(userId);
    if (!userId) throw new UnauthorizedException('Invalid user ID');

    return this.thongTinCaNhanService.getThongTinCaNhan(userId);
  }
}
