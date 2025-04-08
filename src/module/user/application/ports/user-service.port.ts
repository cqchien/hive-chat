import type { User } from '../../domain/entities/user.entity';
import type { CreateUserDto } from '../dtos/create-user.dto';

export interface IUserService {
  findByCondition(condition: Partial<User>): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: CreateUserDto): Promise<User>;
}
