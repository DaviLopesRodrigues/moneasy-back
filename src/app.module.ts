import { Module } from '@nestjs/common';
import { IncomeModule } from './modules/income/income.module';
import { ExpenseModule } from './modules/expense/expense.module';

@Module({
  imports: [IncomeModule, ExpenseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
