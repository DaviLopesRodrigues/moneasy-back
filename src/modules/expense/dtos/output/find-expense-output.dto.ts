import { Exclude, Expose, Transform, Type } from 'class-transformer';

export class findAllExpensesOutputDTO {
  @Expose()
  id: string;

  @Expose()
  date: Date;

  @Expose()
  description: string;

  @Expose()
  category: string;

  @Expose()
  @Transform(({ value }) => Number(value))
  @Type(() => Number)
  value: number;

  @Exclude()
  userId: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

export class findOneExpenseOutputDTO extends findAllExpensesOutputDTO {}
