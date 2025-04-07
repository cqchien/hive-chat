import type { LoginDto } from '../dtos/login.dto';
import type { TokenResponseDto } from '../dtos/token-response.dto';

export interface IAuthService {
  login(loginDto: LoginDto): Promise<TokenResponseDto>;
}

export interface IJwtService {
  signAccessToken(payload: Record<string, unknown>): Promise<{
    accessToken: string;
    expiresIn: number;
  }>;
  signRefreshToken(payload: Record<string, unknown>): Promise<{
    refreshToken: string;
    expiresIn: number;
  }>;
}
