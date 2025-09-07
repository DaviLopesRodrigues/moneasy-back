import { IsInt, IsNumber, IsString } from 'class-validator';

export class DeleteExpenseOutputDTO {
  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsInt()
  id_expense: number;
}
