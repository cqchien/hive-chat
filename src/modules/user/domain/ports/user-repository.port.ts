import type { User } from '../entities/user.entity';

export interface IUserRepository {
  findByCondition(condition: Partial<User>): Promise<User | null>;

  findById(id: string): Promise<User | null>;

  save(user: User): Promise<User>;

  update(user: User): Promise<User>;
}
