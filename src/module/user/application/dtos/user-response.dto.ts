import {
  DateField,
  EmailField,
  StringField,
  StringFieldOptional,
} from 'decorators/field.decorators';
import { User } from 'module/user/domain/entities/user.entity';

export class UserResponseDto {
  @EmailField()
  email!: string;

  @StringField()
  username!: string;

  @StringFieldOptional()
  avatar?: string;

  @DateField()
  createdAt!: Date;

  @DateField()
  updatedAt!: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
