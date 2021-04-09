import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/entity/auth.entity';

@Schema({
  timestamps: true,
  autoCreate: true,
})
export class User {
  @Prop({
    required: true,
    email: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    default: '',
  })
  firstName: string;

  @Prop({
    type: String,
    default: '',
  })
  lastName: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Auth',
  })
  auth: Auth;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
