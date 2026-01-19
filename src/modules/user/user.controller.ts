import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInputDTO } from './dtos/input/create-user-input.dto';
import { CreateUserOutputDTO } from './dtos/output/create-user-output.dto';
import {
  FindAllUsersOutputDTO,
  FindOneUserOutputDTO,
} from './dtos/output/find-user-output.dto';
import { UpdateUserInputDTO } from './dtos/input/update-user-input.dto';
import { UpdateUserOutputDTO } from './dtos/output/update-user-output.dto';
import { DeleteUserOutputDTO } from './dtos/output/delete-user-output.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Criar usuário' })
  @ApiResponse({ status: 200, description: 'Cadastro realizado com sucesso.' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao criar usuário.',
  })
  @Post()
  async createUser(
    @Body() data: CreateUserInputDTO,
  ): Promise<CreateUserOutputDTO> {
    return this.userService.createUser(data);
  }

  @ApiOperation({ summary: 'Listar único usuário' })
  @ApiResponse({ status: 200, description: 'Listagem realizada com sucesso.' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao listar único usuário.',
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOneUser(@Param('id') id: string): Promise<FindOneUserOutputDTO> {
    return this.userService.findOneUser(id);
  }

  @ApiOperation({ summary: 'Listar usuários' })
  @ApiResponse({ status: 200, description: 'Listagem realizada com sucesso.' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao listar usuários.',
  })
  @UseGuards(AuthGuard)
  @Get()
  async findAllUsers(): Promise<FindAllUsersOutputDTO[]> {
    return this.userService.findAllUsers();
  }

  @ApiOperation({ summary: 'Editar usuário' })
  @ApiResponse({ status: 200, description: 'Edição realizada com sucesso.' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao editar usuário.',
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserInputDTO,
  ): Promise<UpdateUserOutputDTO> {
    return await this.userService.updateUser(id, data);
  }

  @ApiOperation({ summary: 'Excluir usuário' })
  @ApiResponse({ status: 200, description: 'Exclusão realizada com sucesso.' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao excluir usuário.',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<DeleteUserOutputDTO> {
    return await this.userService.deleteUser(id);
  }
}
