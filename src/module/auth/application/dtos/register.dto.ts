import {
  EmailField,
  PasswordField,
  StringField,
} from 'decorators/field.decorators';

export class RegisterDto {
  @EmailField()
  email!: string;

  @PasswordField()
  password!: string;

  @StringField()
  username!: string;
}
