import type { ExecutionContext } from '@nestjs/common';
import {
  applyDecorators,
  createParamDecorator,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'guards/auth.guards';
import type { User } from 'module/user/domain/entities/user.entity';

export function AuthUser() {
  return createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<{ user: User }>();

    const user = request.user;

    return user;
  })();
}

export function Auth() {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
