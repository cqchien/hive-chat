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

  constructor(partial: User) {
    this.email = partial.email;
    this.username = partial.username;
    this.avatar = partial.avatar;
    this.createdAt = partial.createdAt;
    this.updatedAt = partial.updatedAt;
  }
}
