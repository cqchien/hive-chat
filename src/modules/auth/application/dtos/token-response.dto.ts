import { NumberField, StringField } from 'decorators/field.decorators';

export class TokenResponseDto {
  @StringField()
  accessToken: string;

  @StringField()
  refreshToken: string;

  @NumberField()
  expiresIn: number;

  constructor(accessToken: string, refreshToken: string, expiresIn: number) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
  }
}
