import { Injectable, HttpStatus } from '@nestjs/common';
import { Todo } from './interfaces/todo.interfaces';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/task/interfaces/task.interfaces';
import { ErrorException } from 'src/_shared/error-exception';
import { statusEnum } from '../_shared/constant';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('Todo') private readonly todoModel: Model<Todo & Document>,
    @InjectModel('Task') private readonly taskModel: Model<Task & Document>,
  ) {}

  async findAll(user): Promise<Todo[]> {
    return this.todoModel.find({ userId: user._id });
  }

  async findOne(todoId: string, user): Promise<Todo> {
    const todo = await this.todoModel.findOne({
      _id: todoId,
      userId: user._id,
    });
    if (!todo)
      throw ErrorException.ERROR('Todo not found', HttpStatus.NOT_FOUND);
    return todo;
  }

  async create(todo, user): Promise<Todo> {
    const userPayload = {
      ...todo,
      userId: user._id,
    };
    const newTodo = new this.todoModel(userPayload);
    if (!newTodo)
      throw ErrorException.ERROR(
        'Todo cannot be created at the moment: try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return await newTodo.save();
  }

  async update(todoId: string, todo, user): Promise<Todo> {
    const updatedTodo = await this.todoModel.findOneAndUpdate(
      { _id: todoId, userId: user._id },
      todo,
      { new: true, useFindAndModify: false },
    );
    if (!updatedTodo)
      throw ErrorException.ERROR(
        'Todo update not successful: try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return updatedTodo;
  }

  async delete(todoId: string, user): Promise<any> {
    const deletedTasks = await this.taskModel.deleteMany({ todoId: todoId });
    const deletedTodo = await this.todoModel.findByIdAndDelete({
      _id: todoId,
      userId: user._id,
    });
    if (!deletedTodo || !deletedTasks)
      throw ErrorException.ERROR(
        'Delete not successful: try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return { id: deletedTodo._id };
  }

  async findAllTasksByTodo(todoId, user): Promise<Task[]> {
    const todo = await this.todoModel.findOne({
      _id: todoId,
      userId: user._id,
    });
    if (!todo)
      throw ErrorException.ERROR('Tasks not found', HttpStatus.NOT_FOUND);
    return todo.tasks;
  }

  async createTaskByTodo(createTaskDto, todoId, user): Promise<Task> {
    const taskPayload = {
      ...createTaskDto,
      userId: user._id,
      todoId,
    };
    const newTask = await this.taskModel.create(taskPayload);
    if (!newTask)
      throw ErrorException.ERROR(
        'Task cannot be created at the moment: try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    await this.todoModel.updateOne(
      { _id: todoId, userId: user._id },
      { $push: { tasks: newTask } },
    );
    return newTask;
  }

  async updateTaskByTodo(task, todoId, taskId, user): Promise<Task> {
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: taskId, userId: user._id },
      task,
      { new: true },
    );
    if (!updatedTask)
      throw ErrorException.ERROR(
        'Task update not successful: try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    // const result = await this.todoModel.findOneAndUpdate(
    //   { _id: todoId, userId: user._id, tasks: { $elemMatch: { _id: taskId } } },
    //   { $set: { 'tasks.$.description': 'hello world' } },
    //   { 'new': true }
    // );
    const todo: any = await this.findOne(todoId, user);
    todo.tasks = todo.tasks.map((task) => {
      if (String(taskId) === String(task._id)) {
        return updatedTask;
      }
      return task;
    });
    await todo.save();

    return updatedTask;
  }

  async deleteTaskByTodo(todoId, taskId, user): Promise<any> {
    const deletedTask: any = await this.taskModel.findOneAndDelete({
      _id: taskId,
      userId: user._id,
    });
    if (!deletedTask)
      throw ErrorException.ERROR(
        'Delete task not successful: try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    const todo: any = await this.findOne(todoId, user);
    todo.tasks = todo.tasks.filter(
      (task) => String(taskId) !== String(task._id),
    );
    await todo.save();

    return { id: deletedTask._id };
  }

  async findTaskByTodo(todoId, taskId, user): Promise<Task> {
    const todo: any = await this.findOne(todoId, user);
    return todo.tasks.find((task) => String(taskId) === String(task._id));
  }

  async updateStatus(todoId, status, user): Promise<Task> {
    if (!statusEnum.includes(status))
      throw ErrorException.ERROR('invalid status', HttpStatus.FORBIDDEN);
    const updatedTodo = await this.todoModel.findOneAndUpdate(
      { _id: todoId, userId: user._id },
      { status },
      { new: true, useFindAndModify: false },
    );
    if (!updatedTodo)
      throw ErrorException.ERROR(
        'Status update not successful: try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return updatedTodo;
  }
}
