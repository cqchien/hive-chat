import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'module/user/user.module';
import { IConfigService } from 'shared/config/config.interface';

import { AuthService } from './application/services/auth.service';
import { JwtService } from './application/services/jwt.service';
import { JwtStrategy } from './application/services/jwt.strategy';
import { AuthController } from './infrastructure/adapters/http/auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
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
    JwtStrategy,
  ],
  exports: [],
})
export class AuthModule {}
