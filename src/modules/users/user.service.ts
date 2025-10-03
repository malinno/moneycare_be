/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async updateRefreshToken(
    userId: string | Types.ObjectId,
    refreshTokenHash: string | null,
  ) {
    return this.userModel.updateOne(
      { _id: userId },
      { $set: { refreshTokenHash } },
    );
  }

  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(username: string, passwordHash: string): Promise<UserDocument> {
    const user = new this.userModel({ username, passwordHash });
    return user.save();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }
  async updateUser(
    userId: string,
    data: { username?: string; password?: string },
  ) {
    const update: any = {};
    if (data.username) update.username = data.username;
    if (data.password) {
      const hash = await bcrypt.hash(data.password, 10);
      update.passwordHash = hash;
    }
    return this.userModel
      .findByIdAndUpdate(userId, update, { new: true })
      .exec();
  }
}
