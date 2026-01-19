import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Data da receita',
    example: '2024-01-20T10:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'Descrição da receita',
    example: 'Salário - Abril/26',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Categoria da receita',
    example: 'Salário, Freelancer, Presente',
  })
  @IsString()
  @IsOptional()
  category: string;

  @ApiProperty({
    description: 'Valor da receita',
    example: 150.9,
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  value: number;
}
