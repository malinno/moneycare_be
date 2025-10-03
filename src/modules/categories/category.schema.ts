import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['expense', 'income'], required: true })
  type: 'expense' | 'income';

  @Prop()
  icon?: string; // icon hiển thị trong UI
}

export const CategorySchema = SchemaFactory.createForClass(Category);
