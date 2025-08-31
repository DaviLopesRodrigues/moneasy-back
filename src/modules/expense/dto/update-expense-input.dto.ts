import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseInputDTO } from './create-expense-input.dto';

export class UpdatePutExpenseDTO extends CreateExpenseInputDTO {}

export class UpdatePatchExpenseDTO extends PartialType(CreateExpenseInputDTO) {}
