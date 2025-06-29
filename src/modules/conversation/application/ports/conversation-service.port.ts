import type { ConversationEntity } from 'modules/conversation/domain/entities/conversation.entity';
import type { UserEntity } from 'modules/user/domain/entities/user.entity';

export interface IConversationService {
  getConversationByParticipants(
    authUser: UserEntity,
    participantIds: string[],
  ): Promise<ConversationEntity>;
}
