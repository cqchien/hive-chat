import { type HttpException, UnauthorizedException } from '@nestjs/common';

import { AuthInvalidCredentialError } from './invalid-credential.error';

export const AUTH_ERROR_MAPPING_EXCEPTION = new Map<
  new (...args: unknown[]) => Error,
  (error: { name: string; message: string }) => HttpException
>([
  [
    AuthInvalidCredentialError,
    (error) => new UnauthorizedException(error.name, error.message),
  ],
]);
