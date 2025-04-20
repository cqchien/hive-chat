import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GroupEntity } from 'modules/group/domain/entities/group.entity';
import { IGroupRepository } from 'modules/group/domain/ports/group-repository.port';
import { Document, Model, Types } from 'mongoose';

import { GroupSchema } from '../schemas/group.schema';

@Injectable()
export class GroupRepository implements IGroupRepository {
  constructor(
    @InjectModel(GroupSchema.name)
    private readonly groupModel: Model<GroupSchema>,
  ) {}

  async createGroup(group: GroupEntity): Promise<GroupEntity> {
    const groupDocument = new this.groupModel(group);

    await groupDocument.save();

    return GroupRepository.toDomain(groupDocument);
  }

  async getGroupByMembers(memberIds: string[]): Promise<GroupEntity | null> {
    const groupDocument = await this.groupModel
      .findOne({
        members: {
          $elemMatch: { userId: { $in: memberIds } },
          $size: memberIds.length,
        },
      })
      .exec();

    return groupDocument ? GroupRepository.toDomain(groupDocument) : null;
  }

  static toDomain(
    groupDocument: Document<unknown, object, GroupSchema> &
      GroupSchema & {
        _id: Types.ObjectId;
      },
  ): GroupEntity {
    return new GroupEntity({
      id: groupDocument._id.toString(),
      name: groupDocument.name,
      type: groupDocument.type,
      pinnedMessages: groupDocument.pinnedMessages,
      members: groupDocument.members.map((member) => ({
        userId: member.userId.toString(),
        role: member.role,
        status: member.status,
        joinedAt: member.joinedAt,
        leftAt: member.leftAt,
        bannedUntil: member.bannedUntil,
      })),
      avatar: groupDocument.avatar,
      createdAt: groupDocument.createdAt,
      updatedAt: groupDocument.updatedAt,
      createdBy: groupDocument.createdBy,
      updatedBy: groupDocument.updatedBy,
      deletedAt: groupDocument.deletedAt,
      deletedBy: groupDocument.deletedBy,
    });
  }
}
