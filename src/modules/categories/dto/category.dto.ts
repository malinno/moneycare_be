/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Ăn uống' })
  @IsString()
  name: string;

  @ApiProperty({ enum: ['expense', 'income'] })
  @IsEnum(['expense', 'income'])
  type: 'expense' | 'income';

  @ApiProperty({ required: false, example: '🍔' })
  @IsOptional()
  @IsString()
  icon?: string;
}

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Giải trí', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, example: '🎮' })
  @IsOptional()
  @IsString()
  icon?: string;
}
