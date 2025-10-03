import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Budget, BudgetSchema } from './budget.schema';
import { BudgetsService } from './budget.service';
import { BudgetController } from './budget.controller';
import { TransactionsModule } from '../transactions/transaction.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Budget.name, schema: BudgetSchema }]),
    TransactionsModule,
  ],
  providers: [BudgetsService],
  controllers: [BudgetController],
  exports: [BudgetsService],
})
export class BudgetsModule {}
