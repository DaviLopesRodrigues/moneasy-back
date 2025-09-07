import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseInputDTO } from './dtos/expense-input.dto';
import { ExpenseOutputDTO } from './dtos/expense-output.dto';
import {
  UpdatePatchExpenseInputDTO,
  UpdatePutExpenseInputDTO,
} from './dtos/update-expense-input.dto';
import {
  UpdatePatchExpenseOutputDTO,
  UpdatePutExpenseOutputDTO,
} from './dtos/update-expense-output.dto';
import { DeleteExpenseOutputDTO } from './dtos/delete-expense-output.dto';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  //Create expense
  @Post()
  async createExpense(
    @Body() body: ExpenseInputDTO,
  ): Promise<ExpenseOutputDTO> {
    return this.expenseService.create(body);
  }

  //Show expense(s)
  @Get()
  async listAllExpenses(): Promise<Array<ExpenseOutputDTO>> {
    return this.expenseService.listAll();
  }

  @Get(':id')
  async listOneExpense(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ExpenseOutputDTO> {
    return this.expenseService.listOne(id);
  }

  //Update expense (PUT - Total) / (PATCH - Partial)
  @Put(':id')
  async updateAllExpense(
    @Body() body: UpdatePutExpenseInputDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdatePutExpenseOutputDTO> {
    return this.expenseService.updateTotal(id, body);
  }

  @Patch(':id')
  async updatePartialExpense(
    @Body() body: UpdatePatchExpenseInputDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdatePatchExpenseOutputDTO> {
    return this.expenseService.updatePartial(id, body);
  }

  //Delete expense
  @Delete(':id')
  async deleteExpense(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteExpenseOutputDTO> {
    return this.expenseService.delete(id);
  }
}
