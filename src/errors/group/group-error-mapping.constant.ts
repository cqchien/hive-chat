import { BadRequestException, type HttpException } from '@nestjs/common';

import { GroupBadRequestValidationError } from './validation.error';

export const GROUP_ERROR_MAPPING_EXCEPTION = new Map<
  new (...args: unknown[]) => Error,
  (error: { name: string; message: string }) => HttpException
>([
  [
    GroupBadRequestValidationError,
    (error) => new BadRequestException(error.name, error.message),
  ],
]);
