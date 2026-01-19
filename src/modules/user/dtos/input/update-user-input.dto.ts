import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserInputDTO {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'johndoe@email.com',
    required: false,
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '1234@Jd',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 2,
    minSymbols: 1,
  })
  password: string;
}
