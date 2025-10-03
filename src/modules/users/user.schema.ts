import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: String, required: false, default: null })
  refreshTokenHash: string | null; // 👈 chỉ rõ type trong @Prop()
}

export const UserSchema = SchemaFactory.createForClass(User);
