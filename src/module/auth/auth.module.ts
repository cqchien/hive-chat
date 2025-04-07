import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'module/user/user.module';
import { IConfigService } from 'shared/config/config.interface';

import { AuthService } from './application/services/auth.service';
import { JwtService } from './application/services/jwt.service';
import { AuthController } from './infrastructure/adapters/http/auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (configService: IConfigService) => ({
        secret: configService.tokenConfig.secret,
      }),
      inject: ['IConfigService'],
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
    {
      provide: 'IJwtService',
      useClass: JwtService,
    },
  ],
  exports: [],
})
export class AuthModule {}
