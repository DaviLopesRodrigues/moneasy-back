import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateExpenseInputDTO } from './dto/create-expense-input.dto';
import {
  UpdatePatchExpenseDTO,
  UpdatePutExpenseDTO,
} from './dto/update-expense-input.dto';
import { ExpenseService } from './expense.service';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  //Create expense
  @Post()
  async createExpense(@Body() body: CreateExpenseInputDTO) {
    return { body };
  }

  //Show expense(s)
  @Get()
  async listAllExpenses(@Body() body) {
    return { incomes: [body] };
  }

  @Get(':id')
  async listOneExpense(@Param('id') id) {
    return { id };
  }

  //Update expense (PUT - Total) / (PATCH - Partial)
  @Put(':id')
  async updateAllExpense(
    @Body() body: UpdatePutExpenseDTO,
    @Param('id') params,
  ) {
    return { body };
  }

  @Patch(':id')
  async updatePartialExpense(
    @Body() body: UpdatePatchExpenseDTO,
    @Param('id') id,
  ) {
    return {
      id,
      body,
    };
  }

  //Delete expense
  @Delete(':id')
  async deleteExpense(@Param('id') id) {
    return { id };
  }
}
