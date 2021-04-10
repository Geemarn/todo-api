import { TodoModule } from './todo.module';
import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interfaces';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/interfaces/user.interfaces';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('Todo') private readonly itemModel: Model<Todo & Document>,
  ) {}

  async findAll(user): Promise<Todo[]> {
    return this.itemModel.find({ userId: user._id });
  }

  async findOne(id: string, user): Promise<Todo> {
    return this.itemModel.findOne({ _id: id, userId: user._id });
  }

  async create(todo: Todo, user): Promise<Todo> {
    const userPayload = {
      ...todo,
      userId: user._id,
    };
    const newItem = new this.itemModel(userPayload);
    return await newItem.save();
  }

  async update(id: string, item: Todo, user): Promise<Todo> {
    return this.itemModel.findOneAndUpdate(
      { _id: id, userId: user._id },
      item,
      { new: true },
    );
  }

  async delete(id: string, user): Promise<Todo> {
    return this.itemModel.findByIdAndDelete({ _id: id, userId: user._id });
  }
}
