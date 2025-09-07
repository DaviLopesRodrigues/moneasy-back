import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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
import { Expense } from 'generated/prisma';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: ExpenseInputDTO): Promise<ExpenseOutputDTO> {
    try {
      const {
        amount,
        category,
        date_transaction,
        description,
        expense_method,
      } = body;

      const req = await this.prisma.expense.create({
        data: {
          amount: amount,
          category: category,
          date_transaction: date_transaction,
          description: description,
          expense_method: expense_method,
        },
      });

      return {
        id_expense: req.id_expense,
        amount: req.amount.toNumber(),
        category: req.category,
        description: req.description,
        date_transaction: req.date_transaction,
        expense_method: req.expense_method,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ocorreu um erro inesperado ao criar a despesa.',
        error: error,
      });
    }
  }

  async listAll(): Promise<Array<ExpenseOutputDTO>> {
    try {
      const expenses = await this.prisma.expense.findMany();

      return expenses.map((expense) => ({
        id_expense: expense.id_expense,
        amount: Number(expense.amount),
        category: expense.category,
        date_transaction: expense.date_transaction,
        description: expense.description,
        expense_method: expense.expense_method,
      }));
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ocorreu um erro inesperado ao listar despesas.',
        error: error,
      });
    }
  }

  async listOne(id: number): Promise<ExpenseOutputDTO> {
    try {
      const expense = await this.verifyExpenseExists(id);

      return {
        id_expense: expense.id_expense,
        amount: Number(expense.amount),
        category: expense.category,
        date_transaction: expense.date_transaction,
        description: expense.description,
        expense_method: expense.expense_method,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ocorreu um erro inesperado ao listar despesa.',
        error: error,
      });
    }
  }

  async updateTotal(
    id: number,
    body: UpdatePutExpenseInputDTO,
  ): Promise<UpdatePutExpenseOutputDTO> {
    try {
      await this.verifyExpenseExists(id);

      const expenseUpdate = await this.prisma.expense.update({
        where: {
          id_expense: id,
        },
        data: body,
      });

      return {
        id_expense: expenseUpdate.id_expense,
        amount: Number(expenseUpdate.amount),
        category: expenseUpdate.category,
        date_transaction: expenseUpdate.date_transaction,
        description: expenseUpdate.description,
        expense_method: expenseUpdate.expense_method,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ocorreu um erro inesperado ao atualizar a despesa.',
        error: error,
      });
    }
  }

  async updatePartial(
    id: number,
    body: UpdatePatchExpenseInputDTO,
  ): Promise<UpdatePatchExpenseOutputDTO> {
    try {
      await this.verifyExpenseExists(id);

      const expenseUpdate = await this.prisma.expense.update({
        where: {
          id_expense: id,
        },
        data: body,
      });

      return {
        id_expense: expenseUpdate.id_expense,
        amount: Number(expenseUpdate.amount),
        category: expenseUpdate.category,
        date_transaction: expenseUpdate.date_transaction,
        description: expenseUpdate.description,
        expense_method: expenseUpdate.expense_method,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ocorreu um erro inesperado ao atualizar a despesa.',
        error: error,
      });
    }
  }

  async delete(id: number): Promise<DeleteExpenseOutputDTO> {
    try {
      await this.verifyExpenseExists(id);

      const deleteExpense = await this.prisma.expense.delete({
        where: {
          id_expense: id,
        },
      });

      return {
        id_expense: deleteExpense.id_expense,
        amount: Number(deleteExpense.amount),
        description: deleteExpense.description,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ocorreu um erro inesperado ao deletar a despesa.',
        error: error,
      });
    }
  }

  private async verifyExpenseExists(id: number): Promise<Expense> {
    try {
      const expense = await this.prisma.expense.findUnique({
        where: { id_expense: id },
      });

      if (!expense) {
        throw new NotFoundException({
          message: `Despesa com ID ${id} não encontrada.`,
          error: 'Não encontrado',
        });
      }

      return expense;
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ocorreu um erro inesperado ao verificar despesa.',
        error: error,
      });
    }
  }
}
