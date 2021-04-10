import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/user/entity/user.entity';

@Schema({
  timestamps: true,
  autoCreate: true,
})
export class Task {
  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  userId: User;
}

const TaskSchema = SchemaFactory.createForClass(Task);

export { TaskSchema };
