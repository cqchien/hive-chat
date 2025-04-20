import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  GroupMemberRole,
  GroupMemberStatus,
} from 'modules/group/domain/constants/group.enum';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ _id: false }) // Disable automatic _id for sub-documents
export class GroupMemberSchema {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  userId!: Types.ObjectId;

  @Prop({
    type: String,
    enum: GroupMemberRole,
    required: true,
    default: GroupMemberRole.MEMBER,
  })
  role!: GroupMemberRole;

  @Prop({
    type: String,
    enum: GroupMemberStatus,
    required: true,
    default: GroupMemberStatus.ACTIVE,
    index: true,
  })
  status!: GroupMemberStatus;

  @Prop({ type: Date, default: Date.now })
  joinedAt!: Date;

  @Prop({ type: Date, required: false })
  leftAt?: Date;

  @Prop({ type: Date, required: false })
  bannedUntil?: Date;
}

export const groupMemberSchema =
  SchemaFactory.createForClass(GroupMemberSchema);
