import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { ValidationError } from 'class-validator';
import { MetaResponseDto, ResponseDto } from 'common/dto/response/response.dto';
import type { Response } from 'express';
import { findKey, includes, isEmpty, snakeCase } from 'lodash';

import { CONSTRAINT_ERRORS } from './constraint-errors';

@Catch()
export class SystemExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(SystemExceptionFilter.name);

  constructor(public reflector: Reflector) {}

  catch(exception: Error | HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | ValidationError[] = exception.message;
    let error = '';

    let validationFilterMessage = '';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const r = exception.getResponse() as {
        error: string;
        message: ValidationError[];
      };

      message = r.message;
      error = r.error;
      validationFilterMessage = this.validationFilter(message);
    }

    this.logger.error(
      error || message,
      process.env.NODE_ENV !== 'production' && exception.stack,
    );

    const metaResponseDto = new MetaResponseDto(
      statusCode,
      validationFilterMessage || error || message.toString(),
      findKey(
        CONSTRAINT_ERRORS,
        (value: string | string[]) =>
          includes(value, error) ||
          includes(value, message.toString()) ||
          includes(value, statusCode.toString()),
      ),
    );

    response.status(statusCode).json(new ResponseDto(null, metaResponseDto));
  }

  private validationFilter(validationErrors: ValidationError[]): string {
    for (const validationError of validationErrors) {
      const children = validationError.children;

      if (children && !isEmpty(children)) {
        return this.validationFilter(children);
      }

      delete validationError.children;

      const constraints = validationError.constraints;

      if (!constraints) {
        return validationError.property;
      }

      for (const [constraintKey, constraint] of Object.entries(constraints)) {
        if (!constraint) {
          constraints[constraintKey] = `error.fields.${snakeCase(
            constraintKey,
          )}`;
        }
      }
    }

    const fields = validationErrors.map((e) => e.property);
    const errors = validationErrors
      .flatMap((e) => Object.values(e.constraints ?? {}))
      .join(', ');
    const message = `Fields: ${fields}, Errors: ${errors}`;

    this.logger.error(message);

    return message;
  }
}
