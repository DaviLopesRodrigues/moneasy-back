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
import { IncomeService } from './income.service';
import { CreateIncomeInputDTO } from './dtos/input/create-income-input.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateIncomeOutputDTO } from './dtos/output/create-income-output.dto';
import {
  findAllIncomesOutputDTO,
  findOneIncomeOutputDTO,
} from './dtos/output/find-income-output.dto';
import { UpdateIncomeInputDTO } from './dtos/input/update-income-input.dto';
import { UpdateIncomeOutputDTO } from './dtos/output/update-income-output.dto';
import { DeleteIncomeOutputDTO } from './dtos/output/delete-income-output.dto';

@Controller('incomes')
@UseGuards(AuthGuard)
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  async createIncome(
    @Body() data: CreateIncomeInputDTO,
    @Req() req,
  ): Promise<CreateIncomeOutputDTO> {
    const userId = req.user.id;
    return await this.incomeService.createIncome(data, userId);
  }

  @Get()
  async findAllIncomes(@Req() req): Promise<findAllIncomesOutputDTO[]> {
    const userId = req.user.id;
    return await this.incomeService.findAllIncomes(userId);
  }

  @Get(':id')
  async findOneIncome(
    @Param('id') id: string,
    @Req() req,
  ): Promise<findOneIncomeOutputDTO> {
    const userId = req.user.id;
    return await this.incomeService.findOneIncome(id, userId);
  }

  @Patch(':id')
  async updateIncome(
    @Body() data: UpdateIncomeInputDTO,
    @Param('id') id: string,
    @Req() req,
  ): Promise<UpdateIncomeOutputDTO> {
    const userId = req.user.id;
    return await this.incomeService.updateIncome(userId, id, data);
  }

  @Delete(':id')
  async deleteIncome(
    @Param('id') id: string,
    @Req() req,
  ): Promise<DeleteIncomeOutputDTO> {
    const userId = req.user.id;
    return await this.incomeService.deleteIncome(id, userId);
  }
}
