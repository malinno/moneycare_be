/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionsService } from '../transactions/transaction.service';
import { Budget, BudgetDocument } from './budget.schema';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel(Budget.name) private budgetModel: Model<BudgetDocument>,
    private txService: TransactionsService,
  ) {}

  async create(
    userId: string,
    categoryId: string,
    limitAmount: number,
    period = 'monthly',
  ) {
    const budget = new this.budgetModel({
      userId,
      categoryId,
      limitAmount,
      period,
      startDate: new Date(),
    });
    return budget.save();
  }

  async findByUser(userId: string) {
    return this.budgetModel.find({ userId }).populate('categoryId').exec();
  }

  async getBudgetsWithProgress(userId: string) {
    const budgets = await this.findByUser(userId);

    // map lại để thêm progress %
    return Promise.all(
      budgets.map(async (b) => {
        const spent = await this.txService.getSpentByCategoryThisMonth(userId);
        const categorySpent = spent.find(
          (s) => s._id?.toString() === (b.categoryId as any)?.toString(),
        );
        const used = categorySpent ? categorySpent.total : 0;
        const progress =
          b.limitAmount > 0
            ? Math.min(100, Math.round((used / b.limitAmount) * 100))
            : 0;

        return {
          id: b._id,
          categoryId: b.categoryId,
          limit: b.limitAmount,
          spent: used,
          progress,
        };
      }),
    );
  }
  async updateBudget(userId: string, id: string, body: any) {
    return this.budgetModel
      .findOneAndUpdate({ _id: id, userId }, body, { new: true })
      .exec();
  }

  async deleteBudget(userId: string, id: string) {
    return this.budgetModel.findOneAndDelete({ _id: id, userId }).exec();
  }
}
