import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'module/auth/application/dtos/login.dto';
import { TokenResponseDto } from 'module/auth/application/dtos/token-response.dto';
import { IAuthService } from 'module/auth/application/ports/auth-service.port';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'User logged in successfully',
    type: TokenResponseDto,
  })
  async login(@Body() loginDto: LoginDto): Promise<TokenResponseDto> {
    return this.authService.login(loginDto);
  }
}
