import { PartialType } from '@nestjs/mapped-types';
import { IncomeInputDTO } from './income-input.dto';

export class UpdatePutIncomeInputDTO extends IncomeInputDTO {}

export class UpdatePatchIncomeInputDTO extends PartialType(IncomeInputDTO) {}
