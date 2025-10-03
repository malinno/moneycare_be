/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  UseGuards,
  Get,
  Post,
  Req,
  Body,
  Query,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionsService } from './transaction.service';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly txService: TransactionsService) {}

  @Get()
  async getAll(@Req() req: any) {
    return this.txService.findAllByUser(req.user.userId);
  }
  @Get('stats')
  async getStats(@Req() req: any, @Query('period') period: string) {
    const userId = req.user.userId;
    if (period === 'monthly') {
      return this.txService.getDailyStatsThisMonth(userId);
    }
    if (period === 'yearly') {
      return this.txService.getMonthlyStatsThisYear(userId);
    }
    return { error: 'Invalid period' };
  }
  @Post()
  async create(
    @Req() req: any,
    @Body()
    body: { type: string; amount: number; categoryId?: string; note?: string },
  ) {
    return this.txService.create(
      req.user.userId,
      body.type,
      body.amount,
      body.categoryId,
      body.note,
    );
  }
  @Put(':id')
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body()
    body: {
      type?: string;
      amount?: number;
      categoryId?: string;
      note?: string;
    },
  ) {
    return this.txService.updateTransaction(req.user.userId, id, body);
  }

  @Delete(':id')
  async remove(@Req() req: any, @Param('id') id: string) {
    return this.txService.deleteTransaction(req.user.userId, id);
  }

  @Get(':id')
  async getOne(@Req() req: any, @Param('id') id: string) {
    return this.txService.findOneByUser(req.user.userId, id);
  }
}
