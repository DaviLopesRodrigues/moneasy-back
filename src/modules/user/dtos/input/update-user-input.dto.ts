import { IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserInputDTO {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

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
