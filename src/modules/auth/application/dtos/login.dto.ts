import { EmailField, PasswordField } from 'decorators/field.decorators';

export class LoginDto {
  @EmailField()
  email!: string;

  @PasswordField()
  password!: string;
}
