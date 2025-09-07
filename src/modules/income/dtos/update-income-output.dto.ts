import { PartialType } from '@nestjs/mapped-types';
import { IncomeInputDTO } from './income-input.dto';
import { IncomeOutputDTO } from './income-output.dto';

export class UpdatePutIncomeOutputDTO extends IncomeOutputDTO {}

export class UpdatePatchIncomeOutputDTO extends PartialType(IncomeOutputDTO) {}
