import * as mongoose from 'mongoose';
import { AuthSchema } from 'src/auth/entity/auth.entity';

export const UserSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  auth: AuthSchema,
});
