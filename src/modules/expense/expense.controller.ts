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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';

@ApiTags('Expenses')
@UseGuards(AuthGuard)
@Controller('expenses')
@ApiBearerAuth()
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @ApiOperation({ summary: 'Criar registro de despesa' })
  @ApiResponse({ status: 200, description: 'Cadastro realizado com sucesso.' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao criar registro de despesa.',
  })
  @Post()
  async createExpense(
    @Body() data: CreateExpenseInputDTO,
    @User('id') user,
  ): Promise<CreateExpenseOutputDTO> {
    return this.expenseService.createExpense(user, data);
  }

  @ApiOperation({ summary: 'Listar registros de despesa' })
  @ApiResponse({ status: 200, description: 'Listagem realizada com sucesso.' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao listar registros de despesa.',
  })
  @Get()
  async findAllExpenses(@User('id') user) {
    return this.expenseService.findAllExpenses(user);
  }

  @ApiOperation({ summary: 'Listar registro de despesa' })
  @ApiResponse({ status: 200, description: 'Listagem realizada com sucesso.' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao listar registro de despesa.',
  })
  @Get(':id')
  async findOneExpense(@Param('id') id: string, @User('id') user) {
    return await this.expenseService.findOneExpense(id, user);
  }

  @ApiOperation({ summary: 'Editar registro de despesa' })
  @ApiResponse({ status: 200, description: 'Edição realizada com sucesso.' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao editar registro de despesa.',
  })
  @Patch(':id')
  async updateExpense(
    @Param('id') id: string,
    @User('id') user,
    @Body() data: UpdateExpenseInputDTO,
  ): Promise<UpdateExpenseOutputDTO> {
    return this.expenseService.updateExpense(id, user, data);
  }

  @ApiOperation({ summary: 'Excluir registro de despesa' })
  @ApiResponse({ status: 200, description: 'Exclusão realizada com sucesso.' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao excluir registro de despesa.',
  })
  @Delete(':id')
  async deleteExpense(
    @Param('id') id: string,
    @User('id') user,
  ): Promise<DeleteExpenseOutputDTO> {
    return this.expenseService.deleteExpense(id, user);
  }
}
