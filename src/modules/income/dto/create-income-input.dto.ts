import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateIncomeInputDTO {
  @IsNumber()
  amount: number;

  @IsString() //TO DO: Mudar para @IsDate()
  date_transaction: Date;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsString()
  income_method: string;
}
