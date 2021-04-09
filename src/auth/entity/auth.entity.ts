import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SCryptCryptoFactory } from '@tpboard/slibs/dist';


@Schema({
  timestamps: true,
  autoCreate: true,
})
export class Auth {
  @Prop({
    type: String,
    required: true,
    email: true,
  })
  email: string;
  @Prop({
    type: String,
    select: false,
  })
  password: string;
};

const AuthSchema = SchemaFactory.createForClass(Auth);

AuthSchema.pre<any>('save', async function(next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = await SCryptCryptoFactory.hash(user.password);
  next();
});

AuthSchema.statics.config = () => {
  return {
    idToken: 'aut',
    hiddenFields: ['password'],
  };
};

export { AuthSchema };
