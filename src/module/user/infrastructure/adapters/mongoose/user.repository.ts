import { InjectModel } from '@nestjs/mongoose';
import { User } from 'module/user/domain/entities/user.entity';
import { IUserRepository } from 'module/user/domain/ports/user-repository.port';
import { Document, Model, Types } from 'mongoose';

import { UserSchema } from '../../schemas/user.schema';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserSchema>,
  ) {}

  async findByCondition(condition: Partial<User>): Promise<User | null> {
    const userDocument = await this.userModel.findOne(condition).exec();

    return userDocument ? UserRepository.toDomain(userDocument) : null;
  }

  async findById(id: string): Promise<User | null> {
    const userDocument = await this.userModel.findById(id).exec();

    return userDocument ? UserRepository.toDomain(userDocument) : null;
  }

  async save(user: User): Promise<User> {
    const userDocument = new this.userModel(user);

    await userDocument.save();

    return UserRepository.toDomain(userDocument);
  }

  async update(user: User): Promise<User> {
    const userDocument = await this.userModel.findByIdAndUpdate(user.id, user, {
      new: true,
    });

    if (!userDocument) {
      throw new Error(`User with id ${user.id} not found for update`);
    }

    return UserRepository.toDomain(userDocument);
  }

  static toDomain(
    userDocument: Document<unknown, object, UserSchema> &
      UserSchema & {
        _id: Types.ObjectId;
      },
  ): User {
    return new User({
      id: userDocument._id.toString(),
      username: userDocument.username,
      password: userDocument.password,
      email: userDocument.email,
      createdAt: userDocument.createdAt,
      updatedAt: userDocument.updatedAt,
    });
  }
}
