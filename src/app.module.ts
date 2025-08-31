import { Module } from '@nestjs/common';
import { IncomeModule } from './modules/income/income.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [IncomeModule, ExpenseModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
