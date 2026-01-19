import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateExpenseInputDTO {
  @ApiProperty({
    description: 'Data da despesa',
    example: '2024-01-20T10:00:00.000Z',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'Descrição da despesa',
    example: 'Pagamento - Conta de energia',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Categoria da despesa',
    example: 'Pagamentos, Saúde, Transporte',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Valor da despesa',
    example: 150.9,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;
}
