import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, AuthUser } from 'decorators/auth.decorators';
import { GetGroupMembersDto } from 'modules/group/application/dtos/get-groups-by-members.dto';
import { IGroupService } from 'modules/group/application/ports/group-service.port';
import { GroupEntity } from 'modules/group/domain/entities/group.entity';
import { UserEntity } from 'modules/user/domain/entities/user.entity';

@Controller('groups')
@ApiTags('Group')
@Auth()
export class GroupController {
  constructor(
    @Inject('IGroupService')
    private readonly groupService: IGroupService,
  ) {}

  @Get('by-members')
  async getGroupByMembers(
    @AuthUser() authUser: UserEntity,
    @Query() queryDto: GetGroupMembersDto,
  ): Promise<GroupEntity> {
    const { memberIds } = queryDto;

    const groupEntity = await this.groupService.getGroupByMembers(
      authUser,
      memberIds,
    );

    return groupEntity;
  }
}
