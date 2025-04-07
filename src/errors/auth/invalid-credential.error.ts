import { ERROR_AUTH_INVALID_CREDENTIAL } from './auth-error.constant';

export class AuthInvalidCredentialError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ERROR_AUTH_INVALID_CREDENTIAL;
  }
}
