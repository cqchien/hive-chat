import { Inject, Injectable } from '@nestjs/common';
import { UserConflictError } from 'errors/user/user-conflict.error';
import { IUserService } from 'modules/user/application/ports/user-service.port';
import { User } from 'modules/user/domain/entities/user.entity';
import { IUserRepository } from 'modules/user/domain/ports/user-repository.port';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async findByCondition(condition: Partial<User>): Promise<User | null> {
    return this.userRepository.findByCondition(condition);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async save(user: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByCondition({
      email: user.email,
    });

    if (existingUser) {
      throw new UserConflictError(
        `User with email ${user.email} already exists`,
      );
    }

    const newUser = UserMapper.toDomain(user);

    return this.userRepository.save(newUser);
  }
}
