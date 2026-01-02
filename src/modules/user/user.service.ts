import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInputDTO } from './dtos/input/create-user-input.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { CreateUserOutputDTO } from './dtos/output/create-user-output.dto';
import {
  FindAllUsersOutputDTO,
  FindOneUserOutputDTO,
} from './dtos/output/find-user-output.dto';
import { UpdateUserInputDTO } from './dtos/input/update-user-input.dto';
import { UpdateUserOutputDTO } from './dtos/output/update-user-output.dto';
import { DeleteUserOutputDTO } from './dtos/output/delete-user-output.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new ConflictException('E-mail já cadastrado.');
    }

    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    const user = await this.prismaService.user.create({
      data: data,
    });

    return plainToInstance(CreateUserOutputDTO, user, {
      strategy: 'excludeAll',
    });
  }

  async findOneUser(id: string): Promise<FindOneUserOutputDTO> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return plainToInstance(FindOneUserOutputDTO, user, {
      strategy: 'excludeAll',
    });
  }

  async findAllUsers(): Promise<FindAllUsersOutputDTO[]> {
    const users = await this.prismaService.user.findMany();

    const mapped = users.map((user) => {
      return plainToInstance(FindAllUsersOutputDTO, user, {
        strategy: 'excludeAll',
      });
    });

    return mapped;
  }

  async updateUser(
    id: string,
    data: UpdateUserInputDTO,
  ): Promise<UpdateUserOutputDTO> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    }
    const user = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data,
    });
    return plainToInstance(UpdateUserOutputDTO, user, {
      strategy: 'excludeAll',
    });
  }

  async deleteUser(id: string): Promise<DeleteUserOutputDTO> {
    const user = await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });

    return plainToInstance(DeleteUserOutputDTO, user, {
      strategy: 'excludeAll',
    });
  }
}
