/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionsService } from '../transactions/transaction.service';
import { BudgetsService } from '../budgets/budget.service';
@Controller('home')
@UseGuards(JwtAuthGuard) // 🔑 mọi request đều yêu cầu token
export class HomeController {
  constructor(
    private transactionsService: TransactionsService,
    private budgetsService: BudgetsService,
  ) {}

  @Get()
  async getHome(@Req() req: any) {
    const userId = req.user.userId;

    // 1. Tổng chi trong tháng
    const totalSpent =
      await this.transactionsService.getTotalSpentThisMonth(userId);

    // 2. Chi theo phân loại
    const byCategory =
      await this.transactionsService.getSpentByCategoryThisMonth(userId);

    // 3. Giao dịch gần đây
    const recentTransactions =
      await this.transactionsService.getRecentTransactions(userId);

    // 4. Hạn mức chi tiêu
    const budgets = await this.budgetsService.getBudgetsWithProgress(userId);

    return {
      totalSpent,
      byCategory,
      recentTransactions,
      budgets,
    };
  }
}
