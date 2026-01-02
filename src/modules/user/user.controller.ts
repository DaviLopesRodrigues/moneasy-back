import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() data: CreateUserInputDTO,
  ): Promise<CreateUserOutputDTO> {
    return this.userService.createUser(data);
  }

  @Get(':id')
  async findOneUser(@Param('id') id: string): Promise<FindOneUserOutputDTO> {
    return this.userService.findOneUser(id);
  }

  @Get()
  async findAllUsers(): Promise<FindAllUsersOutputDTO[]> {
    return this.userService.findAllUsers();
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserInputDTO,
  ): Promise<UpdateUserOutputDTO> {
    return await this.userService.updateUser(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<DeleteUserOutputDTO> {
    return await this.userService.deleteUser(id);
  }
}
