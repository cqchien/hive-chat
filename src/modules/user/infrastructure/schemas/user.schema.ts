import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserSchema {
  @Prop({ type: String, required: true, unique: true, index: true })
  email!: string;

  @Prop({ type: String, required: true })
  password!: string;

  @Prop({ type: String, required: true })
  displayName!: string;

  @Prop({ type: String, required: false })
  avatar!: string;

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt!: Date;
}
