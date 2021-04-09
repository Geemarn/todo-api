import { TodoModule } from './todo.module';
import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interfaces';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('Todo') private readonly itemModel: Model<Todo & Document>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.itemModel.find();
  }

  async findOne(id: string): Promise<Todo> {
    return this.itemModel.findOne({ _id: id });
  }

  async create(item: Todo): Promise<Todo> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async update(id: string, item: Todo): Promise<Todo> {
    return this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<Todo> {
    return this.itemModel.findByIdAndDelete(id);
  }
}
