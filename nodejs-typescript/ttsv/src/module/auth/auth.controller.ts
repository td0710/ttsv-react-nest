import { Controller, Get, UseGuards, Req, Res, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MicrosoftAuthGuard } from 'src/guards/microsoft-auth.guars';
import { User } from '../user/user.entity';
import { Response as ExpressResponse } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(MicrosoftAuthGuard)
  @Get('microsoft-auth')
  loginMicrosoft() {}

  @UseGuards(MicrosoftAuthGuard)
  @Get('microsoft/callback')
  loginMicrosoftCallback(
    @Req() request: Request & { user: User },
    @Res() response: ExpressResponse,
  ) {
    console.log(process.env.JWT_SECRET);
    const user = request.user;

    const tokens = this.authService.login(user);

    response.cookie('jwt', tokens, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 86400000,
    });

    response.redirect('http://localhost:3000/thongtincanhan');
  }

  @UseGuards(JwtAuthGuard)
  @Get('check-session')
  checkSession(@Res() res: ExpressResponse) {
    console.log('Session is valid');
    return res.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res() res: ExpressResponse) {
    res.cookie('jwt', null, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
    res.status(200).send({ message: 'Đã đăng xuất' });
  }
}
