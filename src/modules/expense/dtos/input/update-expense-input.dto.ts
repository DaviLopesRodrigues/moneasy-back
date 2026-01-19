import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateExpenseInputDTO {
  @ApiProperty({
    description: 'Data da despesa',
    example: '2024-01-20T10:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'Descrição da despesa',
    example: 'Pagamento - Conta de energia',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Categoria da despesa',
    example: 'Pagamentos, Saúde, Transporte',
    required: false,
  })
  @IsString()
  @IsOptional()
  category: string;

  @ApiProperty({
    description: 'Valor da despesa',
    example: 150.9,
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  value: number;
}
