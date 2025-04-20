import type { UserEntity } from 'modules/user/domain/entities/user.entity';

import type { CreateUserDto } from '../dtos/create-user.dto';

export interface IUserService {
  findByCondition(condition: Partial<UserEntity>): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  save(user: CreateUserDto): Promise<UserEntity>;
  getUsersByIds(ids: string[]): Promise<UserEntity[]>;
}
