import type { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  findByCondition(condition: Partial<UserEntity>): Promise<UserEntity | null>;

  findById(id: string): Promise<UserEntity | null>;

  save(user: UserEntity): Promise<UserEntity>;

  update(user: UserEntity): Promise<UserEntity>;

  getUsersByIds(ids: string[]): Promise<UserEntity[]>;
}
