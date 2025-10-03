/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private txModel: Model<TransactionDocument>,
  ) {}

  async create(
    userId: string,
    type: string,
    amount: number,
    categoryId?: string,
    note?: string,
  ) {
    const tx = new this.txModel({
      userId,
      type,
      amount,
      categoryId,
      note,
      date: new Date(),
    });
    return tx.save();
  }

  async findAllByUser(userId: string) {
    return this.txModel.find({ userId }).sort({ date: -1 }).exec();
  }

  async getRecentTransactions(userId: string) {
    return this.txModel.find({ userId }).sort({ date: -1 }).limit(5).exec();
  }

  async getTotalSpentThisMonth(userId: string) {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setMonth(end.getMonth() + 1, 1);
    end.setHours(0, 0, 0, 0);

    const res = await this.txModel.aggregate([
      { $match: { userId, type: 'expense', date: { $gte: start, $lt: end } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    return res.length > 0 ? res[0].total : 0;
  }

  async getSpentByCategoryThisMonth(userId: string) {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setMonth(end.getMonth() + 1, 1);
    end.setHours(0, 0, 0, 0);

    return this.txModel.aggregate([
      { $match: { userId, type: 'expense', date: { $gte: start, $lt: end } } },
      { $group: { _id: '$categoryId', total: { $sum: '$amount' } } },
    ]);
  }
  async getDailyStatsThisMonth(userId: string) {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setMonth(end.getMonth() + 1, 1);
    end.setHours(0, 0, 0, 0);

    const res = await this.txModel.aggregate([
      { $match: { userId, type: 'expense', date: { $gte: start, $lt: end } } },
      {
        $group: {
          _id: { day: { $dayOfMonth: '$date' } },
          total: { $sum: '$amount' },
        },
      },
      { $sort: { '_id.day': 1 } },
    ]);

    return res.map((r) => ({ day: r._id.day, total: r.total }));
  }

  async getMonthlyStatsThisYear(userId: string) {
    const start = new Date(new Date().getFullYear(), 0, 1);
    const end = new Date(new Date().getFullYear() + 1, 0, 1);

    const res = await this.txModel.aggregate([
      { $match: { userId, type: 'expense', date: { $gte: start, $lt: end } } },
      {
        $group: {
          _id: { month: { $month: '$date' } },
          total: { $sum: '$amount' },
        },
      },
      { $sort: { '_id.month': 1 } },
    ]);

    return res.map((r) => ({ month: r._id.month, total: r.total }));
  }
  async updateTransaction(userId: string, id: string, body: any) {
    return this.txModel
      .findOneAndUpdate({ _id: id, userId }, body, { new: true })
      .exec();
  }

  async deleteTransaction(userId: string, id: string) {
    return this.txModel.findOneAndDelete({ _id: id, userId }).exec();
  }

  async findOneByUser(userId: string, id: string) {
    return this.txModel.findOne({ _id: id, userId }).exec();
  }
}
