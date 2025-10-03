import { Module } from '@nestjs/common';
import { TransactionsModule } from '../transactions/transaction.module';
import { BudgetsModule } from '../budgets/budget.module';
import { HomeController } from './home.controller';

@Module({
  imports: [TransactionsModule, BudgetsModule],
  controllers: [HomeController],
})
export class HomeModule {}
