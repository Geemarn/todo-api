import { User } from 'src/user/interfaces/user.interfaces';

export class Todo {
  id?: string;
  name: string;
  description?: string;
  userId?: User;
}
