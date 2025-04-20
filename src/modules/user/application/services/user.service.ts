import { Inject, Injectable } from '@nestjs/common';
import { UserConflictError } from 'errors/user/user-conflict.error';
import { UserNotFoundError } from 'errors/user/user-not-found.error';
import { IUserService } from 'modules/user/application/ports/user-service.port';
import { UserEntity } from 'modules/user/domain/entities/user.entity';
import { IUserRepository } from 'modules/user/domain/ports/user-repository.port';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async findByCondition(
    condition: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    return this.userRepository.findByCondition(condition);
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  async getUsersByIds(ids: string[]): Promise<UserEntity[]> {
    const users = await this.userRepository.getUsersByIds(ids);

    if (users.length !== ids.length) {
      const missingIds = ids.filter(
        (id) => !users.some((user) => user.id === id),
      );

      throw new UserNotFoundError(
        `Users with IDs ${missingIds.join(', ')} not found`,
      );
    }

    return users;
  }

  async save(user: CreateUserDto): Promise<UserEntity> {
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
