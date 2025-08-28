import { Injectable } from '@nestjs/common';
import { CreateIncomeInputDTO } from './dto/create-income-input.dto';
import {
  UpdatePatchIncomeDTO,
  UpdatePutIncomeDTO,
} from './dto/update-income-input.dto';

@Injectable()
export class IncomeService {
  async create(body: CreateIncomeInputDTO) {
    //return this.
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
