import { Injectable } from '@nestjs/common';
import { CreateIncomeInputDTO } from './dto/create-income-input.dto';
import {
  UpdatePatchIncomeDTO,
  UpdatePutIncomeDTO,
} from './dto/update-income-input.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IncomeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateIncomeInputDTO) {
    const { amount, category, date_transaction, description, income_method } =
      body;
    return this.prisma.income.create({
      data: {
        amount: amount,
        category: category,
        date_transaction: date_transaction,
        description: description,
        income_method: income_method,
      },
    });
  }

  async listAll() {
    //return this.
  }

  async listOne(id: number) {
    //return this.
  }

  async updateAll(id: number, body: UpdatePutIncomeDTO) {
    //return this.
  }

  async updateOne(id: number, body: UpdatePatchIncomeDTO) {
    //return this.
  }

  async delete(id: number) {
    //return this.
  }
}
