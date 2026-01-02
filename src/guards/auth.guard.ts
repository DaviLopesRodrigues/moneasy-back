import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const [type, token] = request?.headers?.authorization?.split(' ') ?? '';

      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException(
          'Token de autorização ausente ou mal informado.',
        );
      }

      const data = await this.authService.checkToken(token);

      request.user = data;

      return true;
    } catch (error) {
      throw error;
    }
  }
}
