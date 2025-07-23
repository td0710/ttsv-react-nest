import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-azure-ad-oauth2';
import * as jwt from 'jsonwebtoken';
import { VerifiedCallback } from 'passport-jwt';
import { UserService } from 'src/module/user/user.service';
import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/module/user/user.entity';

interface MicrosoftJwtPayload {
  oid?: string;
  sub?: string;
  [key: string]: unknown;
}
@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'azure') {
  constructor(private readonly userService: UserService) {
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;
    const redirectUri = process.env.AZURE_REDIRECT_URI;
    const tenantId = process.env.AZURE_TENANT_ID;
    const scope = 'openid profile email User.Read offline_access';

    super({
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: redirectUri,
      scope: scope,
      tenant: tenantId,
      passReqToCallback: false,
      authorizationURL: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`,
      tokenURL: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifiedCallback,
  ): Promise<void> {
    try {
      const decoded = jwt.decode(accessToken) as MicrosoftJwtPayload;

      console.log('🧩 Token Payload:', decoded);

      const microsoftId = decoded.oid || decoded.sub || '';
      let user = await this.userService.findByMicrosoftId(microsoftId);
      if (!user) {
        user = await this.userService.createUser({
          microsoft_id: microsoftId,
          email: typeof decoded.email === 'string' ? decoded.email : undefined,
          full_name:
            typeof decoded.name === 'string' ? decoded.name : undefined,
          role: UserRole.SINH_VIEN,
        });
      }
      done(null, user);
    } catch (error) {
      console.error('Error in MicrosoftStrategy validate:', error);
      done(error, null);
    }
  }
}
