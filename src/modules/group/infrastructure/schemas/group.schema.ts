import { Prop, Schema } from '@nestjs/mongoose';
import { GroupType } from 'modules/group/domain/constants/group.enum';
import mongoose from 'mongoose';

import {
  groupMemberModelSchema,
  GroupMemberSchema,
} from './group-member.schema';

@Schema({
  collection: 'groups',
  timestamps: true,
})
export class GroupSchema {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, enum: GroupType, required: true })
  type!: GroupType;

  @Prop({ type: String, required: false })
  avatar!: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    required: false,
  })
  pinnedMessages?: string[];

  @Prop({
    type: [groupMemberModelSchema],
    required: false,
    default: [],
  })
  members!: GroupMemberSchema[];

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
