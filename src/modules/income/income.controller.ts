import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeInputDTO } from './dto/create-income-input.dto';
import {
  UpdatePatchIncomeDTO,
  UpdatePutIncomeDTO,
} from './dto/update-income-input.dto';

@Controller('incomes')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  //Create income
  @Post()
  async createIncome(@Body() body: CreateIncomeInputDTO) {
    return { body };
  }

  //Show income(s)
  @Get()
  async listAllIncomes() {
    //return
  }

  @Get(':id')
  async listOneIncome(@Param('id') id) {
    //return
  }

  //Update income
  @Put(':id')
  async updateAllIncome(@Body() body: UpdatePutIncomeDTO, @Param('id') params) {
    //return
  }

  @Patch(':id')
  async updatePartialIncome(
    @Body() body: UpdatePatchIncomeDTO,
    @Param('id') params,
  ) {
    //return
  }

  //Delete income
  @Delete(':id')
  async deleteIncome(@Param('id') params) {
    //return
  }
}
