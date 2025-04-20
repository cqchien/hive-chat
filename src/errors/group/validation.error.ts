import { ERROR_GROUP_BAD_REQUEST_VALIDATION } from './group-error.constant';

export class GroupBadRequestValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ERROR_GROUP_BAD_REQUEST_VALIDATION;
  }
}
