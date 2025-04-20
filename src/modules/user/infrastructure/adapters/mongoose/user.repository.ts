import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from 'modules/user/domain/entities/user.entity';
import { IUserRepository } from 'modules/user/domain/ports/user-repository.port';
import { Document, Model, Types } from 'mongoose';

import { UserSchema } from '../../schemas/user.schema';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserSchema>,
  ) {}

  async findByCondition(
    condition: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    const userDocument = await this.userModel.findOne(condition).exec();

    return userDocument ? UserRepository.toDomain(userDocument) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const userDocument = await this.userModel.findById(id).exec();

    return userDocument ? UserRepository.toDomain(userDocument) : null;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const userDocument = new this.userModel(user);

    await userDocument.save();

    return UserRepository.toDomain(userDocument);
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const userDocument = await this.userModel.findByIdAndUpdate(user.id, user, {
      new: true,
    });

    if (!userDocument) {
      throw new Error(`User with id ${user.id} not found for update`);
    }

    return UserRepository.toDomain(userDocument);
  }

  async getUsersByIds(ids: string[]): Promise<UserEntity[]> {
    const userDocuments = await this.userModel
      .find({ _id: { $in: ids.map((id) => new Types.ObjectId(id)) } })
      .exec();

    return userDocuments.map((userDocument) =>
      UserRepository.toDomain(userDocument),
    );
  }

  static toDomain(
    userDocument: Document<unknown, object, UserSchema> &
      UserSchema & {
        _id: Types.ObjectId;
      },
  ): UserEntity {
    return new UserEntity({
      id: userDocument._id.toString(),
      displayName: userDocument.displayName,
      password: userDocument.password,
      email: userDocument.email,
      createdAt: userDocument.createdAt,
      updatedAt: userDocument.updatedAt,
    });
  }
}
