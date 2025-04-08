import { Inject, Injectable } from '@nestjs/common';
import { compareHash } from 'common/utils/hash.utils';
import { AuthInvalidCredentialError } from 'errors/auth/invalid-credential.error';
import { IUserService } from 'module/user/application/ports/user-service.port';

import { LoginDto } from '../dtos/login.dto';
import { TokenResponseDto } from '../dtos/token-response.dto';
import { IAuthService } from '../ports/auth-service.port';
import { IJwtService } from '../ports/jwt-service.port';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,

    @Inject('IJwtService')
    private readonly jwtService: IJwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<TokenResponseDto> {
    const existingUser = await this.userService.findByCondition({
      email: loginDto.email,
    });

    if (!existingUser) {
      throw new AuthInvalidCredentialError(
        `User with email ${loginDto.email} not found`,
      );
    }

    const isPasswordValid = compareHash(
      loginDto.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new AuthInvalidCredentialError('Invalid credentials');
    }

    const tokenPayload = {
      id: existingUser.id,
      email: existingUser.email,
    };

    const accessToken = await this.jwtService.signAccessToken(tokenPayload);
    const refreshToken = await this.jwtService.signRefreshToken(tokenPayload);

    return new TokenResponseDto(
      accessToken.accessToken,
      refreshToken.refreshToken,
      accessToken.expiresIn,
    );
  }
}
