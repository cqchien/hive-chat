import type { ConversationEntity } from '../entities/conversation.entity';

export interface IConversationRepository {
  createConversation(
    conversation: ConversationEntity,
  ): Promise<ConversationEntity>;
  getConversationByParticipants(
    participantIds: string[],
  ): Promise<ConversationEntity | null>;
}
