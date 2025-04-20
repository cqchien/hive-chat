export class UserEntity {
  id!: string;

  displayName!: string;

  password!: string;

  email!: string;

  avatar?: string;

  createdAt!: Date;

  updatedAt!: Date;

  constructor(props: Partial<UserEntity>) {
    Object.assign(this, props);
  }
}
