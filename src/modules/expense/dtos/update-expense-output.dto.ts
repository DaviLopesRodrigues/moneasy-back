import { PartialType } from '@nestjs/mapped-types';
import { ExpenseOutputDTO } from './expense-output.dto';

export class UpdatePutExpenseOutputDTO extends ExpenseOutputDTO {}

export class UpdatePatchExpenseOutputDTO extends PartialType(
  ExpenseOutputDTO,
) {}
