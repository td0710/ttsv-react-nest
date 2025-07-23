import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type UserPayload = {
  email: string;
  role: string;
  microsoft_id?: string;
  full_name?: string;
  id?: number;
  createdDate?: Date;
};
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: UserPayload) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }
}
