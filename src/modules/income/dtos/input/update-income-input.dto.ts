import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateIncomeInputDTO {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date: Date;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  value: number;
}
