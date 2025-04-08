import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthInvalidCredentialError } from 'errors/auth/invalid-credential.error';
import { IUserService } from 'module/user/application/ports/user-service.port';
import { User } from 'module/user/domain/entities/user.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IConfigService } from 'shared/config/config.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,

    @Inject('IConfigService')
    configService: IConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.tokenConfig.secret,
    });
  }

  async validate(args: { id: string; email: string }): Promise<User> {
    const existingUser = await this.userService.findById(args.id);

    if (!existingUser) {
      throw new AuthInvalidCredentialError('Invalid credentials');
    }

    return existingUser;
  }
}
