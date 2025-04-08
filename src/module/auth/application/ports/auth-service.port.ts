import type { LoginDto } from '../dtos/login.dto';
import type { TokenResponseDto } from '../dtos/token-response.dto';

export interface IAuthService {
  login(loginDto: LoginDto): Promise<TokenResponseDto>;
}
