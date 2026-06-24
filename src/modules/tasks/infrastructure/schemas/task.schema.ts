import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true})
export class TaskDocument extends Document {
  @Prop({ required: true, maxlength: 100 })
  title: string;

  @Prop({ maxlength: 500 })
  description?: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(TaskDocument);