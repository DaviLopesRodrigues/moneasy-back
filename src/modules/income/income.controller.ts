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
import { IncomeService } from './income.service';
import { IncomeInputDTO } from './dtos/income-input.dto';
import { IncomeOutputDTO } from './dtos/income-output.dto';
import {
  UpdatePatchIncomeOutputDTO,
  UpdatePutIncomeOutputDTO,
} from './dtos/update-income-output.dto';
import { DeleteIncomeOutputDTO } from './dtos/delete-income-output.dto';
import {
  UpdatePatchIncomeInputDTO,
  UpdatePutIncomeInputDTO,
} from './dtos/update-income-input.dto';

@Controller('incomes')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  //Create income
  @Post()
  async createIncome(@Body() body: IncomeInputDTO): Promise<IncomeOutputDTO> {
    return this.incomeService.create(body);
  }

  //Show income(s)
  @Get()
  async listAllIncomes(): Promise<Array<IncomeOutputDTO>> {
    return this.incomeService.listAll();
  }

  @Get(':id')
  async listOneIncome(@Param('id', ParseIntPipe) id): Promise<IncomeOutputDTO> {
    return this.incomeService.listOne(id);
  }

  //Update income (PUT - Total) / (PATCH - Partial)
  @Put(':id')
  async updateAllIncome(
    @Body() body: UpdatePutIncomeInputDTO,
    @Param('id', ParseIntPipe) id,
  ): Promise<UpdatePutIncomeOutputDTO> {
    return this.incomeService.updateTotal(id, body);
  }

  @Patch(':id')
  async updatePartialIncome(
    @Body() body: UpdatePatchIncomeInputDTO,
    @Param('id', ParseIntPipe) id,
  ): Promise<UpdatePatchIncomeOutputDTO> {
    return this.incomeService.updatePartial(id, body);
  }

  //Delete income
  @Delete(':id')
  async deleteIncome(
    @Param('id', ParseIntPipe) id,
  ): Promise<DeleteIncomeOutputDTO> {
    return this.incomeService.delete(id);
  }
}
