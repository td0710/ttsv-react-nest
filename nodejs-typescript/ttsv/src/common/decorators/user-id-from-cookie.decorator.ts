import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface RequestCookies {
  cookies: { jwt: string };
}

interface Payload {
  id: number;
}
export const UserIdFromCookie = createParamDecorator(
  (_, ctx: ExecutionContext): number | null => {
    const request = ctx.switchToHttp().getRequest<Request>() as RequestCookies;
    const token = request.cookies?.jwt || '';

    if (!token) return null;

    const jwtService = new JwtService({ secret: process.env.JWT_SECRET });
    const payload = jwtService.decode<Payload>(token);

    if (payload && typeof payload.id === 'number') {
      return payload.id;
    }

    return null;
  },
);
