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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';

@ApiTags('Incomes')
@Controller('incomes')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @ApiOperation({ summary: 'Criar registro de receita' })
  @ApiResponse({ status: 200, description: 'Cadastro realizado com sucesso.' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao criar registro de receita.',
  })
  @Post()
  async createIncome(
    @Body() data: CreateIncomeInputDTO,
    @User('id') user,
  ): Promise<CreateIncomeOutputDTO> {
    return await this.incomeService.createIncome(data, user);
  }

  @ApiOperation({ summary: 'Listar registros de receita' })
  @ApiResponse({ status: 200, description: 'Listagem realizada com sucesso.' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao listar registros de receita.',
  })
  @Get()
  async findAllIncomes(@User('id') user): Promise<findAllIncomesOutputDTO[]> {
    return await this.incomeService.findAllIncomes(user);
  }

  @ApiOperation({ summary: 'Listar registro de receita' })
  @ApiResponse({ status: 200, description: 'Listagem realizada com sucesso.' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao listar registro de receita.',
  })
  @Get(':id')
  async findOneIncome(
    @Param('id') id: string,
    @User('id') user,
  ): Promise<findOneIncomeOutputDTO> {
    return await this.incomeService.findOneIncome(id, user);
  }

  @ApiOperation({ summary: 'Editar registro de receita' })
  @ApiResponse({ status: 200, description: 'Edição realizada com sucesso.' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao editar registro de receita.',
  })
  @Patch(':id')
  async updateIncome(
    @Body() data: UpdateIncomeInputDTO,
    @Param('id') id: string,
    @User('id') user,
  ): Promise<UpdateIncomeOutputDTO> {
    return await this.incomeService.updateIncome(user, id, data);
  }

  @ApiOperation({ summary: 'Excluir registro de receita' })
  @ApiResponse({ status: 200, description: 'Exclusão realizada com sucesso.' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao excluir registro de receita.',
  })
  @Delete(':id')
  async deleteIncome(
    @Param('id') id: string,
    @User('id') user,
  ): Promise<DeleteIncomeOutputDTO> {
    return await this.incomeService.deleteIncome(id, user);
  }
}
