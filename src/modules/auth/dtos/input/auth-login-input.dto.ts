import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthLoginInputDTO {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'user@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Senha do usuário (Mínimo 6 caracteres, letras, números e símbolos)',
    example: '1234Aa@',
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 2,
    minSymbols: 1,
  })
  password: string;
}
