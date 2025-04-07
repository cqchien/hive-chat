export class User {
  id!: string;

  username!: string;

  password!: string;

  email!: string;

  avatar?: string;

  createdAt!: Date;

  updatedAt!: Date;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }
}
