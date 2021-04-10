import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/user/entity/user.entity';

@Schema({
  timestamps: true,
  autoCreate: true,
})
export class Todo {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  userId: User;
}

const TodoSchema = SchemaFactory.createForClass(Todo);

export { TodoSchema };
