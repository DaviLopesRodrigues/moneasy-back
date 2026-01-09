import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseInputDTO } from './dtos/input/create-expense-input.dto';
import { CreateExpenseOutputDTO } from './dtos/output/create-expense-output.dto';
import { plainToInstance } from 'class-transformer';
import {
  findAllExpensesOutputDTO,
  findOneExpenseOutputDTO,
} from './dtos/output/find-expense-output.dto';
import { UpdateExpenseInputDTO } from './dtos/input/update-expense-input.dto';
import { UpdateExpenseOutputDTO } from './dtos/output/update-expense-output.dto';
import { DeleteExpenseOutputDTO } from './dtos/output/delete-expense-output.dto';

@Injectable()
export class ExpenseService {
  constructor(private readonly prismaService: PrismaService) {}

  async createExpense(
    userId: string,
    data: CreateExpenseInputDTO,
  ): Promise<CreateExpenseOutputDTO> {
    const expense = await this.prismaService.expense.create({
      data: {
        ...data,
        userId,
      },
    });

    return plainToInstance(CreateExpenseOutputDTO, expense, {
      strategy: 'excludeAll',
    });
  }

  async findAllExpenses(userId: string) {
    const expenses = await this.prismaService.expense.findMany({
      where: {
        userId: userId,
      },
    });

    const mapped = expenses.map((expense) => {
      return plainToInstance(findAllExpensesOutputDTO, expense, {
        strategy: 'excludeAll',
      });
    });

    return mapped;
  }

  async findOneExpense(id: string, userId: string) {
    const expense = await this.prismaService.expense.findFirst({
      where: {
        userId: userId,
        id: id,
      },
    });

    if (!expense) {
      throw new NotFoundException('Despesa não encontrada.');
    }

    return plainToInstance(findOneExpenseOutputDTO, expense, {
      strategy: 'excludeAll',
    });
  }

  async updateExpense(
    id: string,
    userId: string,
    data: UpdateExpenseInputDTO,
  ): Promise<UpdateExpenseOutputDTO> {
    const expenseExists = await this.prismaService.expense.findUnique({
      where: {
        id: id,
      },
    });

    if (!expenseExists) {
      throw new NotFoundException('Despesa não encontrada.');
    }

    if (expenseExists.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para alterar esta despesa.',
      );
    }

    const expense = await this.prismaService.expense.update({
      where: {
        id: id,
      },
      data: data,
    });

    return plainToInstance(UpdateExpenseOutputDTO, expense, {
      strategy: 'excludeAll',
    });
  }

  async deleteExpense(
    id: string,
    userId: string,
  ): Promise<DeleteExpenseOutputDTO> {
    const expenseExists = await this.prismaService.expense.findUnique({
      where: {
        id: id,
      },
    });

    if (!expenseExists) {
      throw new NotFoundException('Despesa não encontrada.');
    }

    if (expenseExists.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para deletar esta despesa.',
      );
    }

    const expense = await this.prismaService.expense.delete({
      where: {
        id: id,
      },
    });

    return plainToInstance(DeleteExpenseOutputDTO, expense, {
      strategy: 'excludeAll',
    });
  }
}
