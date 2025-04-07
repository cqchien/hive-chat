import { Inject, Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { IConfigService } from 'shared/config/config.interface';

import { IJwtService } from '../ports/auth-service.port';

@Injectable()
export class JwtService implements IJwtService {
  constructor(
    @Inject('IConfigService')
    private readonly configService: IConfigService,

    private jwtService: NestJwtService,
  ) {}

  async signAccessToken(payload: Record<string, unknown>): Promise<{
    accessToken: string;
    expiresIn: number;
  }> {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.tokenConfig.accessTokenExpiration,
    });

    return {
      accessToken: token,
      expiresIn: this.configService.tokenConfig.accessTokenExpiration,
    };
  }

  async signRefreshToken(payload: Record<string, unknown>): Promise<{
    refreshToken: string;
    expiresIn: number;
  }> {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.tokenConfig.refreshTokenExpiration,
    });

    return {
      refreshToken: token,
      expiresIn: this.configService.tokenConfig.refreshTokenExpiration,
    };
  }
}
