import { Todo } from 'src/todo/interfaces/todo.interfaces';
import { User } from 'src/user/interfaces/user.interfaces';

export class Task {
  id?: string;
  description?: string;
  userId?: User;
  todoId?: Todo;
}
