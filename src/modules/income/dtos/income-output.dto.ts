import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNumber, IsString } from 'class-validator';

export class IncomeOutputDTO {
  @IsNumber()
  amount: number;

  @IsDate()
  @Type(() => Date)
  date_transaction: Date;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsString()
  income_method: string;

  @IsInt()
  id_income: number;
}
