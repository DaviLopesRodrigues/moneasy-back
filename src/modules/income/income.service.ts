import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IncomeInputDTO } from './dtos/income-input.dto';
import {
  UpdatePatchIncomeInputDTO,
  UpdatePutIncomeInputDTO,
} from './dtos/update-income-input.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IncomeOutputDTO } from './dtos/income-output.dto';
import {
  UpdatePatchIncomeOutputDTO,
  UpdatePutIncomeOutputDTO,
} from './dtos/update-income-output.dto';
import { DeleteIncomeOutputDTO } from './dtos/delete-income-output.dto';
import { Income } from 'generated/prisma';

@Injectable()
export class IncomeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: IncomeInputDTO): Promise<IncomeOutputDTO> {
    try {
      const { amount, category, date_transaction, description, income_method } =
        body;

      const req = await this.prisma.income.create({
        data: {
          amount: amount,
          category: category,
          date_transaction: date_transaction,
          description: description,
          income_method: income_method,
        },
      });

      return {
        id_income: req.id_income,
        amount: req.amount.toNumber(),
        category: req.category,
        description: req.description,
        date_transaction: req.date_transaction,
        income_method: req.income_method,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ocorreu um erro inesperado ao criar a receita.',
        error: error,
      });
    }
  }

  async listAll(): Promise<Array<IncomeOutputDTO>> {
    try {
      const incomes = await this.prisma.income.findMany();

      return incomes.map((income) => ({
        id_income: income.id_income,
        amount: Number(income.amount),
        category: income.category,
        date_transaction: income.date_transaction,
        description: income.description,
        income_method: income.income_method,
      }));
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ocorreu um erro inesperado ao listar receitas.',
        error: error,
      });
    }
  }

  async listOne(id: number): Promise<IncomeOutputDTO> {
    try {
      const income = await this.verifyIncomeExists(id);

      return {
        id_income: income.id_income,
        amount: Number(income.amount),
        category: income.category,
        date_transaction: income.date_transaction,
        description: income.description,
        income_method: income.income_method,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ocorreu um erro inesperado ao listar receita.',
        error: error,
      });
    }
  }

  async updateTotal(
    id: number,
    body: UpdatePutIncomeInputDTO,
  ): Promise<UpdatePutIncomeOutputDTO> {
    try {
      await this.verifyIncomeExists(id);

      const incomeUpdate = await this.prisma.income.update({
        where: {
          id_income: id,
        },
        data: body,
      });

      return {
        id_income: incomeUpdate.id_income,
        amount: Number(incomeUpdate.amount),
        category: incomeUpdate.category,
        date_transaction: incomeUpdate.date_transaction,
        description: incomeUpdate.description,
        income_method: incomeUpdate.income_method,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ocorreu um erro inesperado ao atualizar a receita.',
        error: error,
      });
    }
  }

  async updatePartial(
    id: number,
    body: UpdatePatchIncomeInputDTO,
  ): Promise<UpdatePatchIncomeOutputDTO> {
    try {
      await this.verifyIncomeExists(id);

      const incomeUpdate = await this.prisma.income.update({
        where: {
          id_income: id,
        },
        data: body,
      });

      return {
        id_income: incomeUpdate.id_income,
        amount: Number(incomeUpdate.amount),
        category: incomeUpdate.category,
        date_transaction: incomeUpdate.date_transaction,
        description: incomeUpdate.description,
        income_method: incomeUpdate.income_method,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ocorreu um erro inesperado ao atualizar a receita.',
        error: error,
      });
    }
  }

  async delete(id: number): Promise<DeleteIncomeOutputDTO> {
    try {
      await this.verifyIncomeExists(id);

      const deleteIncome = await this.prisma.income.delete({
        where: {
          id_income: id,
        },
      });

      return {
        id_income: deleteIncome.id_income,
        amount: Number(deleteIncome.amount),
        description: deleteIncome.description,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ocorreu um erro inesperado ao deletar a receita.',
        error: error,
      });
    }
  }

  private async verifyIncomeExists(id: number): Promise<Income> {
    try {
      const income = await this.prisma.income.findUnique({
        where: { id_income: id },
      });

      if (!income) {
        throw new NotFoundException({
          message: `Receita com ID ${id} não encontrada.`,
          error: 'Não encontrado',
        });
      }

      return income;
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ocorreu um erro inesperado ao verificar receita.',
        error: error,
      });
    }
  }
}
