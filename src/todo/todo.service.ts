import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interfaces';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/task/interfaces/task.interfaces';

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
    return this.todoModel.findOne({ _id: todoId, userId: user._id });
  }

  async create(todo, user): Promise<Todo> {
    const userPayload = {
      ...todo,
      userId: user._id,
    };
    const newTodo = new this.todoModel(userPayload);
    return await newTodo.save();
  }

  async update(todoId: string, todo, user): Promise<Todo> {
    return this.todoModel.findOneAndUpdate(
      { _id: todoId, userId: user._id },
      todo,
      { new: true },
    );
  }

  async delete(todoId: string, user): Promise<Todo> {
    return this.todoModel.findByIdAndDelete({ _id: todoId, userId: user._id });
  }

  async findAllTasksByTodo(todoId, user): Promise<Task[]> {
    const todo = await this.todoModel.findOne({
      _id: todoId,
      userId: user._id,
    });
    return todo.tasks;
  }

  async createTaskByTodo(createTaskDto, todoId, user): Promise<Task> {
    const taskPayload = {
      ...createTaskDto,
      userId: user._id,
    };
    const newTask = await this.taskModel.create(taskPayload);
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
    todo.save();

    return updatedTask;
  }

  async deleteTaskByTodo(todoId, taskId, user): Promise<Task> {
    const deletedTask: Task = await this.taskModel.findOneAndDelete({
      _id: taskId,
      userId: user._id,
    });
    const todo: any = await this.findOne(todoId, user);
    todo.tasks = todo.tasks.filter(
      (task) => String(taskId) !== String(task._id),
    );
    todo.save();

    return deletedTask;
  }

  async findTaskByTodo(todoId, taskId, user): Promise<Task> {
    const todo: any = await this.findOne(todoId, user);
    return todo.tasks.find((task) => String(taskId) === String(task._id));
  }
}
