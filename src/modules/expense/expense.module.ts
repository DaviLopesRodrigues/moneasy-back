import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';

@Module({
  imports: [],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [],
})
export class ExpenseModule {}
