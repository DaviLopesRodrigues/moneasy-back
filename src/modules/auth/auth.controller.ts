import { Controller, Post, Headers, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginInputDTO } from './dtos/input/auth-login-input.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza o login e retorna o token JWT' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Email e/ou senha incorretos.' })
  async login(@Body() data: AuthLoginInputDTO) {
    return await this.authService.login(data);
  }
}
