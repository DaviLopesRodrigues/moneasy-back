import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

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

      request.payload = data;

      const user = await this.userService.findOneUser(data.id);

      request.user = user;

      return true;
    } catch (error) {
      throw error;
    }
  }
}
