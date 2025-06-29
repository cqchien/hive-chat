import { ERROR_CONVERSATION_BAD_REQUEST_VALIDATION } from './conversation-error.constant';

export class ConversationBadRequestValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ERROR_CONVERSATION_BAD_REQUEST_VALIDATION;
  }
}
