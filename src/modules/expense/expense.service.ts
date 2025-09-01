import { Injectable } from '@nestjs/common';
import { CreateExpenseInputDTO } from './dto/create-expense-input.dto';
import {
  UpdatePatchExpenseDTO,
  UpdatePutExpenseDTO,
} from './dto/update-expense-input.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateExpenseInputDTO) {
    //return this.
  }

  async listAll() {
    //return this.
  }

  async listOne(id: number) {
    //return this.
  }

  async updateAll(id: number, body: UpdatePutExpenseDTO) {
    //return this.
  }

  async updateOne(id: number, body: UpdatePatchExpenseDTO) {
    //return this.
  }

  async delete(id: number) {
    //return this.
  }
}
