import {
  DateField,
  EmailField,
  StringField,
  StringFieldOptional,
} from 'decorators/field.decorators';
import { UserEntity } from 'modules/user/domain/entities/user.entity';

export class UserResponseDto {
  @EmailField()
  email!: string;

  @StringField()
  displayName!: string;

  @StringFieldOptional()
  avatar?: string;

  @DateField()
  createdAt!: Date;

  @DateField()
  updatedAt!: Date;

  constructor(partial: UserEntity) {
    this.email = partial.email;
    this.displayName = partial.displayName;
    this.avatar = partial.avatar;
    this.createdAt = partial.createdAt;
    this.updatedAt = partial.updatedAt;
  }
}
