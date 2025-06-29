import type { UserEntity } from 'modules/user/domain/entities/user.entity';

import type { ConversationType } from '../constants/conversation.enum';
import { ParticipantStatus } from '../constants/conversation.enum';

export type Participants = {
  userId: string;
  status: ParticipantStatus;
  joinedAt: Date;
  leftAt?: Date;
  bannedUntil?: Date;
};

export class ConversationEntity {
  id!: string;

  name?: string;

  type!: ConversationType;

  avatar?: string;

  pinnedMessages?: string[];

  participants!: Participants[];

  createdAt!: Date;

  updatedAt!: Date;

  createdBy?: string;

  updatedBy?: string;

  deletedAt?: Date;

  deletedBy?: string;

  constructor(props: Partial<ConversationEntity>) {
    Object.assign(this, props);
  }

  static createConversation(
    authUser: UserEntity,
    participants: UserEntity[],
    conversationType: ConversationType,
  ): ConversationEntity {
    const conversationName = participants
      .map((participant) => participant.displayName)
      .join(', ');

    const conversationparticipants = participants.map(
      (member): Participants => ({
        userId: member.id,
        status: ParticipantStatus.ACTIVE,
        joinedAt: new Date(),
      }),
    );

    const conversation = new ConversationEntity({
      name: conversationName,
      type: conversationType,
      participants: conversationparticipants,
      createdBy: authUser.id,
    });

    return conversation;
  }
}
