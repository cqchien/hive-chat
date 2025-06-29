import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, AuthUser } from 'decorators/auth.decorators';
import { GetConversationByParticipantsDto } from 'modules/conversation/application/dtos/get-conversation-by-participants.dto';
import { IConversationService } from 'modules/conversation/application/ports/conversation-service.port';
import { ConversationEntity } from 'modules/conversation/domain/entities/conversation.entity';
import { UserEntity } from 'modules/user/domain/entities/user.entity';

@Controller('conversations')
@ApiTags('Conversation')
@Auth()
export class ConversationController {
  constructor(
    @Inject('IConversationService')
    private readonly conversationService: IConversationService,
  ) {}

  @Get('by-participants')
  async getGroupByMembers(
    @AuthUser() authUser: UserEntity,
    @Query() queryDto: GetConversationByParticipantsDto,
  ): Promise<ConversationEntity> {
    const { participantIds } = queryDto;

    const conversationEntity =
      await this.conversationService.getConversationByParticipants(
        authUser,
        participantIds,
      );

    return conversationEntity;
  }
}
