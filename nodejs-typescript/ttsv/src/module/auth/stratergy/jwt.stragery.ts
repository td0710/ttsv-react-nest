import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

interface RequestWithCookies extends Request {
  cookies: {
    jwt?: string;
  };
}
interface payload {
  userId: number;
  email: string;
  role: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: RequestWithCookies) => {
          if (!req?.cookies?.jwt) return null;

          const token = req.cookies.jwt;
          if (typeof token !== 'string' || token.trim().length === 0) {
            return null;
          }

          return token;
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
    console.log(process.env.JWT_SECRET);
  }

  validate(payload: payload): payload {
    console.log('JWT Payload:', payload);
    return payload;
  }
}
