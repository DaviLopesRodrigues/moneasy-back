import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateExpenseInputDTO } from './dtos/input/create-expense-input.dto';
import { CreateExpenseOutputDTO } from './dtos/output/create-expense-output.dto';
import { UpdateExpenseInputDTO } from './dtos/input/update-expense-input.dto';
import { UpdateExpenseOutputDTO } from './dtos/output/update-expense-output.dto';
import { DeleteExpenseOutputDTO } from './dtos/output/delete-expense-output.dto';

@UseGuards(AuthGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async createExpense(
    @Body() data: CreateExpenseInputDTO,
    @Req() req,
  ): Promise<CreateExpenseOutputDTO> {
    const userId = req.user.id;
    return this.expenseService.createExpense(userId, data);
  }

  @Get()
  async findAllExpenses(@Req() req) {
    const userId = req.user.id;
    return this.expenseService.findAllExpenses(userId);
  }

  @Get(':id')
  async findOneExpense(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return await this.expenseService.findOneExpense(id, userId);
  }

  @Patch(':id')
  async updateExpense(
    @Param('id') id: string,
    @Req() req,
    @Body() data: UpdateExpenseInputDTO,
  ): Promise<UpdateExpenseOutputDTO> {
    const userId = req.user.id;
    return this.expenseService.updateExpense(id, userId, data);
  }

  @Delete(':id')
  async deleteExpense(
    @Param('id') id: string,
    @Req() req,
  ): Promise<DeleteExpenseOutputDTO> {
    const userId = req.user.id;
    return this.expenseService.deleteExpense(id, userId);
  }
}
