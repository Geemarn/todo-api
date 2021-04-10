import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoSchema } from './entity/todo.entity';
import { TaskSchema } from 'src/task/entity/task.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Todo', schema: TodoSchema },
      { name: 'Task', schema: TaskSchema },
    ]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
