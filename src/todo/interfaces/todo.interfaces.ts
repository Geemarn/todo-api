import { User } from 'src/user/interfaces/user.interfaces';
import { Task } from '../../task/interfaces/task.interfaces';

export class Todo {
  id?: string;
  name: string;
  description?: string;
  status: string;
  userId?: User;
  tasks: [Task];
}
