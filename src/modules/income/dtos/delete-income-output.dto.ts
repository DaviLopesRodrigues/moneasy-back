import { IsInt, IsNumber, IsString } from 'class-validator';

export class DeleteIncomeOutputDTO {
  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsInt()
  id_income: number;
}
