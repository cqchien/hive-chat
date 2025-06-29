import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ParticipantStatus } from 'modules/conversation/domain/constants/conversation.enum';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ _id: false }) // Disable automatic _id for sub-documents
export class ParticipantSchema {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  userId!: Types.ObjectId;

  @Prop({
    type: String,
    enum: ParticipantStatus,
    required: true,
    default: ParticipantStatus.ACTIVE,
    index: true,
  })
  status!: ParticipantStatus;

  @Prop({ type: Date, default: Date.now })
  joinedAt!: Date;

  @Prop({ type: Date, required: false })
  leftAt?: Date;

  @Prop({ type: Date, required: false })
  bannedUntil?: Date;
}

export const participantModelSchema =
  SchemaFactory.createForClass(ParticipantSchema);
