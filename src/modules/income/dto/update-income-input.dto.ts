import { PartialType } from '@nestjs/mapped-types';
import { CreateIncomeInputDTO } from './create-income-input.dto';

export class UpdatePutIncomeDTO extends CreateIncomeInputDTO {}

export class UpdatePatchIncomeDTO extends PartialType(CreateIncomeInputDTO) {}
