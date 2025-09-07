import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class ExpenseInputDTO {
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
  expense_method: string;
}
