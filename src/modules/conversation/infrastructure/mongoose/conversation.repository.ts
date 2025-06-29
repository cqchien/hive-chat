import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConversationEntity } from 'modules/conversation/domain/entities/conversation.entity';
import { IConversationRepository } from 'modules/conversation/domain/ports/conversation-repository.port';
import { Document, Model, Types } from 'mongoose';

import { ConversationSchema } from '../schemas/conversation.schema';

@Injectable()
export class ConversationRepository implements IConversationRepository {
  constructor(
    @InjectModel(ConversationSchema.name)
    private readonly conversationModel: Model<ConversationSchema>,
  ) {}

  async createConversation(
    conversation: ConversationEntity,
  ): Promise<ConversationEntity> {
    const conversationDocument = new this.conversationModel(conversation);

    await conversationDocument.save();

    return ConversationRepository.toDomain(conversationDocument);
  }

  async getConversationByParticipants(
    participantIds: string[],
  ): Promise<ConversationEntity | null> {
    const conversationDocument = await this.conversationModel
      .findOne({
        members: {
          $elemMatch: { userId: { $in: participantIds } },
          $size: participantIds.length,
        },
      })
      .exec();

    return conversationDocument
      ? ConversationRepository.toDomain(conversationDocument)
      : null;
  }

  static toDomain(
    conversationDocument: Document<unknown, object, ConversationSchema> &
      ConversationSchema & {
        _id: Types.ObjectId;
      },
  ): ConversationEntity {
    return new ConversationEntity({
      id: conversationDocument._id.toString(),
      name: conversationDocument.name,
      type: conversationDocument.type,
      pinnedMessages: conversationDocument.pinnedMessages,
      participants: conversationDocument.participants.map((participant) => ({
        userId: participant.userId.toString(),
        status: participant.status,
        joinedAt: participant.joinedAt,
        leftAt: participant.leftAt,
        bannedUntil: participant.bannedUntil,
      })),
      avatar: conversationDocument.avatar,
      createdAt: conversationDocument.createdAt,
      updatedAt: conversationDocument.updatedAt,
      createdBy: conversationDocument.createdBy,
      updatedBy: conversationDocument.updatedBy,
      deletedAt: conversationDocument.deletedAt,
      deletedBy: conversationDocument.deletedBy,
    });
  }
}
