import { Controller, Post, Headers, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginInputDTO } from './dtos/input/auth-login-input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: AuthLoginInputDTO) {
    return await this.authService.login(data);
  }
}
