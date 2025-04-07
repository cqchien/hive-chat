import { HttpStatus } from '@nestjs/common';
import { AUTH_ERRORS } from 'errors/auth/auth-error.constant';
import { USER_ERRORS } from 'errors/user/user-error.constant';

export const CONSTRAINT_ERRORS: Record<string, string | string[]> = {
  SYS_000: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
  SYS_002: HttpStatus.UNPROCESSABLE_ENTITY.toString(),
  SYS_003: HttpStatus.SERVICE_UNAVAILABLE.toString(),

  ...USER_ERRORS,
  ...AUTH_ERRORS,
};
