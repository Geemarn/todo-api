import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { User } from '../interfaces/user.interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') protected readonly userModel: Model<User & Document>,
  ) {}

  /**
   * @param {Object} obj The payload object
   * @return {Object} returns created user
   */
  public async create(obj: any) {
    return this.userModel.create(obj);
  }

  /**
   * @param {email} email: The payload object
   * @return {Object} returns found user
   */
  public async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  /**
   * @return {Object} returns users
   */
  public async getUsers(): Promise<User[]> {
    return this.userModel.find();
  }
}
