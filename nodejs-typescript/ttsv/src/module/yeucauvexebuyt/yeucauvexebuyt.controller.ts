import { Controller, Delete, Get, Query, UseGuards } from '@nestjs/common';
import { YeucauvexebuytService } from './yeucauvexebuyt.service';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { UserIdFromCookie } from 'src/common/decorators/user-id-from-cookie.decorator';

@Controller('yeucauvexebuyt')
export class YeucauvexebuytController {
  constructor(private readonly yeuCaVeXeBuytService: YeucauvexebuytService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-yeu-cau-ve-xe')
  async getYeuCauByUserId(@UserIdFromCookie() userId: number) {
    const response =
      await this.yeuCaVeXeBuytService.getYeuCauVeXeByUserId(userId);
    return response;
  }
  @UseGuards(JwtAuthGuard)
  @Delete('huy-yeu-cau-vxb')
  async deleteYeuCau(@Query('id') id: number) {
    await this.yeuCaVeXeBuytService.deleteYeuCauVeXe(id);
    return 'Hủy yêu cầu vé xe thành công';
  }
}
