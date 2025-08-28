import { Module } from '@nestjs/common';
import { IncomeModule } from './modules/income/income.module';

@Module({
  imports: [IncomeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
