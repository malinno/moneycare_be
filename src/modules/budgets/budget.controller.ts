/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BudgetsService } from './budget.service';

@Controller('budgets')
@UseGuards(JwtAuthGuard)
export class BudgetController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get()
  async getBudgets(@Req() req: any) {
    return this.budgetsService.getBudgetsWithProgress(req.user.userId);
  }

  @Post()
  async createBudget(
    @Req() req: any,
    @Body() body: { categoryId: string; limitAmount: number; period?: string },
  ) {
    return this.budgetsService.create(
      req.user.userId,
      body.categoryId,
      body.limitAmount,
      body.period,
    );
  }
  @Put(':id')
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { limitAmount?: number; period?: string },
  ) {
    return this.budgetsService.updateBudget(req.user.userId, id, body);
  }

  @Delete(':id')
  async remove(@Req() req: any, @Param('id') id: string) {
    return this.budgetsService.deleteBudget(req.user.userId, id);
  }
}
