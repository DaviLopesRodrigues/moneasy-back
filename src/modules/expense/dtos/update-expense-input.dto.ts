import { PartialType } from '@nestjs/mapped-types';
import { ExpenseInputDTO } from './expense-input.dto';

export class UpdatePutExpenseInputDTO extends ExpenseInputDTO {}

export class UpdatePatchExpenseInputDTO extends PartialType(ExpenseInputDTO) {}
