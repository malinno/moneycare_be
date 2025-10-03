/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBudgetDto {
  @ApiProperty()
  @IsString()
  categoryId: string;

  @ApiProperty({ example: 5000000 })
  @IsNumber()
  limitAmount: number;

  @ApiProperty({ example: 'monthly', required: false })
  @IsOptional()
  @IsString()
  period?: string;
}

export class UpdateBudgetDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  limitAmount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  period?: string;
}
