import { Inject, Injectable } from '@nestjs/common';
import { uniq } from 'lodash';
import { GroupEntity } from 'modules/group/domain/entities/group.entity';
import { IGroupRepository } from 'modules/group/domain/ports/group-repository.port';
import { IUserService } from 'modules/user/application/ports/user-service.port';
import { UserEntity } from 'modules/user/domain/entities/user.entity';

import { IGroupService } from '../ports/group-service.port';

@Injectable()
export class GroupService implements IGroupService {
  constructor(
    @Inject('IGroupRepository')
    private readonly groupRepository: IGroupRepository,

    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  async getGroupByMembers(
    authUser: UserEntity,
    memberIds: string[],
  ): Promise<GroupEntity> {
    const members = await this.userService.getUsersByIds(uniq(memberIds));

    const existingGroup =
      await this.groupRepository.getGroupByMembers(memberIds);

    if (existingGroup) {
      return existingGroup;
    }

    const newGroup = GroupEntity.createGroupByMembers(authUser, members);

    return this.groupRepository.createGroup(newGroup);
  }
}
