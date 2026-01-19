import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateIncomeInputDTO {
  @ApiProperty({
    description: 'Data da receita',
    example: '2024-01-20T10:00:00.000Z',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'Descrição da receita',
    example: 'Salário - Abril/26',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Categoria da receita',
    example: 'Salário, Freelancer, Presente',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Valor da receita',
    example: 150.9,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;
}
