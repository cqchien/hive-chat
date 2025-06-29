import { BadRequestException, type HttpException } from '@nestjs/common';

import { ConversationBadRequestValidationError } from './validation.error';

export const CONVERSATION_ERROR_MAPPING_EXCEPTION = new Map<
  new (...args: unknown[]) => Error,
  (error: { name: string; message: string }) => HttpException
>([
  [
    ConversationBadRequestValidationError,
    (error) => new BadRequestException(error.name, error.message),
  ],
]);
