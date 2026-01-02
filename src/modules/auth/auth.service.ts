import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthLoginInputDTO } from './dtos/input/auth-login-input.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async createToken(user: User) {
    const token = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      accessToken: token,
    };
  }

  async checkToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }
  }

  async login(data: AuthLoginInputDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorreto(s).');
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('E-mail e/ou senha incorreto(s).');
    }

    return this.createToken(user);
  }
}
