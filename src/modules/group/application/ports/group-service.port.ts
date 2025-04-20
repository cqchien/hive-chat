import type { GroupEntity } from 'modules/group/domain/entities/group.entity';
import type { UserEntity } from 'modules/user/domain/entities/user.entity';

export interface IGroupService {
  getGroupByMembers(
    authUser: UserEntity,
    memberIds: string[],
  ): Promise<GroupEntity>;
}
