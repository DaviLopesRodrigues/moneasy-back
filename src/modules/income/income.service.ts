import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIncomeInputDTO } from './dtos/input/create-income-input.dto';
import { CreateIncomeOutputDTO } from './dtos/output/create-income-output.dto';
import { plainToInstance } from 'class-transformer';
import {
  findAllIncomesOutputDTO,
  findOneIncomeOutputDTO,
} from './dtos/output/find-income-output.dto';
import { UpdateIncomeInputDTO } from './dtos/input/update-income-input.dto';
import { UpdateIncomeOutputDTO } from './dtos/output/update-income-output.dto';
import { DeleteIncomeOutputDTO } from './dtos/output/delete-income-output.dto';

@Injectable()
export class IncomeService {
  constructor(private readonly prismaService: PrismaService) {}

  async createIncome(
    data: CreateIncomeInputDTO,
    userId: string,
  ): Promise<CreateIncomeOutputDTO> {
    const income = await this.prismaService.income.create({
      data: {
        ...data,
        userId,
      },
    });

    return plainToInstance(CreateIncomeOutputDTO, income, {
      strategy: 'excludeAll',
    });
  }

  async findAllIncomes(userId: string): Promise<findAllIncomesOutputDTO[]> {
    const incomes = await this.prismaService.income.findMany({
      where: {
        userId: userId,
      },
    });

    const mapped = incomes.map((income) => {
      return plainToInstance(findAllIncomesOutputDTO, income, {
        strategy: 'excludeAll',
      });
    });

    return mapped;
  }

  async findOneIncome(
    id: string,
    userId: string,
  ): Promise<findOneIncomeOutputDTO> {
    const income = await this.prismaService.income.findFirst({
      where: {
        userId: userId,
        id: id,
      },
    });

    if (!income) {
      throw new NotFoundException('Receita não encontrada.');
    }

    return plainToInstance(findOneIncomeOutputDTO, income, {
      strategy: 'excludeAll',
    });
  }

  async updateIncome(
    userId: string,
    id: string,
    data: UpdateIncomeInputDTO,
  ): Promise<UpdateIncomeOutputDTO> {
    const incomeExists = await this.prismaService.income.findUnique({
      where: { id: id },
    });

    if (!incomeExists) {
      throw new NotFoundException('Receita não encontrada.');
    }

    if (incomeExists.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para alterar esta receita.',
      );
    }

    const income = await this.prismaService.income.update({
      where: {
        id: id,
      },
      data: data,
    });

    return plainToInstance(UpdateIncomeOutputDTO, income, {
      strategy: 'excludeAll',
    });
  }

  async deleteIncome(
    id: string,
    userId: string,
  ): Promise<DeleteIncomeOutputDTO> {
    const incomeExists = await this.prismaService.income.findUnique({
      where: { id: id },
    });

    if (!incomeExists) {
      throw new NotFoundException('Receita não encontrada.');
    }

    if (incomeExists.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para deletar esta receita.',
      );
    }

    const income = await this.prismaService.income.delete({
      where: {
        id: id, // Delete usa apenas o ID
      },
    });

    return plainToInstance(DeleteIncomeOutputDTO, income, {
      strategy: 'excludeAll',
    });
  }
}
