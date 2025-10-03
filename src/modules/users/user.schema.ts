import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;
  @Prop({ required: true })
  refreshTokenHash?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
