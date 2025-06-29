import { Inject, Injectable } from '@nestjs/common';
import { ConversationBadRequestValidationError } from 'errors/conversation/validation.error';
import { uniq } from 'lodash';
import { MIN_PARTICIPANTS_FOR_GROUP_CHAT } from 'modules/conversation/domain/constants/conversation.contant';
import { ConversationType } from 'modules/conversation/domain/constants/conversation.enum';
import { ConversationEntity } from 'modules/conversation/domain/entities/conversation.entity';
import { IConversationRepository } from 'modules/conversation/domain/ports/conversation-repository.port';
import { IUserService } from 'modules/user/application/ports/user-service.port';
import { UserEntity } from 'modules/user/domain/entities/user.entity';

import { IConversationService } from '../ports/conversation-service.port';

@Injectable()
export class ConversationService implements IConversationService {
  constructor(
    @Inject('IConversationRepository')
    private readonly conversationRepository: IConversationRepository,

    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  async getConversationByParticipants(
    authUser: UserEntity,
    participantIds: string[],
  ): Promise<ConversationEntity> {
    const participants = await this.userService.getUsersByIds(
      uniq(participantIds),
    );

    const existingConversation =
      await this.conversationRepository.getConversationByParticipants(
        participantIds,
      );

    if (existingConversation) {
      return existingConversation;
    }

    if (!participants.length) {
      throw new ConversationBadRequestValidationError(
        'At least one participants are required to create a group chat.',
      );
    }

    const conversationType =
      participants.length >= MIN_PARTICIPANTS_FOR_GROUP_CHAT
        ? ConversationType.GROUP
        : ConversationType.DIRECT;

    const createdConversation = ConversationEntity.createConversation(
      authUser,
      participants,
      conversationType,
    );

    return this.conversationRepository.createConversation(createdConversation);
  }
}
