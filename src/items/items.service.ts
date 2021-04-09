import { ItemsModule } from './items.module';
import { Injectable } from '@nestjs/common';
import { Items } from './interfaces/items.interfaces';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel('Item') private readonly itemModel: Model<Items & Document>,
  ) {}

  async findAll(): Promise<Items[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Items> {
    return await this.itemModel.findOne({ _id: id });
  }

  async create(item: Items): Promise<Items> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async update(id: string, item: Items): Promise<Items> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<Items> {
    return await this.itemModel.findByIdAndDelete(id);
  }
}
