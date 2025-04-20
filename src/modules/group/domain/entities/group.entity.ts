import { GroupBadRequestValidationError } from 'errors/group/validation.error';
import type { UserEntity } from 'modules/user/domain/entities/user.entity';

import {
  GroupMemberRole,
  GroupMemberStatus,
  GroupType,
} from '../constants/group.enum';

export type GroupMember = {
  userId: string;
  role: GroupMemberRole;
  status: GroupMemberStatus;
  joinedAt: Date;
  leftAt?: Date;
  bannedUntil?: Date;
};

export class GroupEntity {
  id!: string;

  name!: string;

  type!: GroupType;

  avatar?: string;

  pinnedMessages?: string[];

  members!: GroupMember[];

  createdAt!: Date;

  updatedAt!: Date;

  createdBy?: string;

  updatedBy?: string;

  deletedAt?: Date;

  deletedBy?: string;

  constructor(props: Partial<GroupEntity>) {
    Object.assign(this, props);
  }

  static createGroupByMembers(
    authUser: UserEntity,
    members: UserEntity[],
  ): GroupEntity {
    if (members.length < 2) {
      throw new GroupBadRequestValidationError(
        'At least two members are required to create a group chat.',
      );
    }

    const groupName = members.map((member) => member.displayName).join(', ');
    const groupType = members.length > 2 ? GroupType.GROUP : GroupType.DIRECT;
    const groupMembers = members.map((member): GroupMember => {
      const role =
        member.id === authUser.id
          ? GroupMemberRole.ADMIN
          : GroupMemberRole.MEMBER;

      return {
        userId: member.id,
        role,
        status: GroupMemberStatus.ACTIVE,
        joinedAt: new Date(),
      };
    });

    const group = new GroupEntity({
      name: groupName,
      type: groupType,
      members: groupMembers,
    });

    return group;
  }
}
