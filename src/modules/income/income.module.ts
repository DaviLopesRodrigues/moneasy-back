import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [IncomeController],
  providers: [IncomeService],
  exports: [IncomeService],
})
export class IncomeModule {}
