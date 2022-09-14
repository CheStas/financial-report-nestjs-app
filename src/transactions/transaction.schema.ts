import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Transaction {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  sum: number;

  @Prop({ required: true })
  source: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  userId: string;
}

export type TransactionDocument = Transaction & Document;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
