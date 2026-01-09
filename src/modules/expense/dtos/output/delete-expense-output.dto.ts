import { Exclude, Expose, Transform, Type } from 'class-transformer';

export class DeleteExpenseOutputDTO {
  @Expose()
  id: string;

  @Exclude()
  date: Date;

  @Exclude()
  description: string;

  @Exclude()
  category: string;

  @Exclude()
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
