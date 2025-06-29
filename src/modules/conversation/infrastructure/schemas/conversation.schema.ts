import { Prop, Schema } from '@nestjs/mongoose';
import { ConversationType } from 'modules/conversation/domain/constants/conversation.enum';
import mongoose from 'mongoose';

import {
  participantModelSchema,
  ParticipantSchema,
} from './participant.schema';

@Schema({
  collection: 'conversations',
  timestamps: true,
})
export class ConversationSchema {
  @Prop({ type: String })
  name?: string;

  @Prop({ type: String, enum: ConversationType, required: true })
  type!: ConversationType;

  @Prop({ type: String })
  avatar?: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    required: false,
  })
  pinnedMessages?: string[];

  @Prop({
    type: [participantModelSchema],
    required: false,
    default: [],
  })
  participants!: ParticipantSchema[];

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt!: Date;

  @Prop({ type: String, required: false })
  createdBy?: string;

  @Prop({ type: String, required: false })
  updatedBy?: string;

  @Prop({ type: Date, required: false })
  deletedAt?: Date;

  @Prop({ type: String, required: false })
  deletedBy?: string;
}
