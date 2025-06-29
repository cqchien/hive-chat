import type { HttpException } from '@nestjs/common';
import { AUTH_ERROR_MAPPING_EXCEPTION } from 'errors/auth/auth-error-mapping.constant';
import { CONVERSATION_ERROR_MAPPING_EXCEPTION } from 'errors/conversation/conversation-error-mapping.constant';
import { USER_ERROR_MAPPING_EXCEPTION } from 'errors/user/user-error-mapping.constant';

const ERROR_MAPPINGS = new Map<
  new (...args: unknown[]) => unknown,
  (error: unknown) => HttpException
>([
  ...USER_ERROR_MAPPING_EXCEPTION,
  ...AUTH_ERROR_MAPPING_EXCEPTION,
  ...CONVERSATION_ERROR_MAPPING_EXCEPTION,
]);

export function mapToHttpException(error: Error): HttpException {
  const mapping = ERROR_MAPPINGS.get(
    error.constructor as new (...args: unknown[]) => unknown,
  );

  if (mapping) {
    return mapping(error);
  }

  throw error;
}
