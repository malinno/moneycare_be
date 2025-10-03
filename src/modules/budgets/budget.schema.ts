import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BudgetDocument = HydratedDocument<Budget>;

@Schema({ timestamps: true })
export class Budget {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: string;

  @Prop({ required: true })
  limitAmount: number;

  @Prop({ default: 'monthly' }) // monthly | weekly | custom
  period: string;

  @Prop({ default: () => new Date() })
  startDate: Date;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
