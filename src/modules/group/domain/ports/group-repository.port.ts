import type { GroupEntity } from '../entities/group.entity';

export interface IGroupRepository {
  createGroup(group: GroupEntity): Promise<GroupEntity>;
  getGroupByMembers(memberIds: string[]): Promise<GroupEntity | null>;
}
