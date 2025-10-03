/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ enum: ['expense', 'income'] })
  @IsEnum(['expense', 'income'])
  type: 'expense' | 'income';

  @ApiProperty({ example: 500000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note?: string;
}

export class UpdateTransactionDto {
  @ApiProperty({ enum: ['expense', 'income'], required: false })
  @IsOptional()
  @IsEnum(['expense', 'income'])
  type?: 'expense' | 'income';

  @ApiProperty({ example: 1000000, required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note?: string;
}
