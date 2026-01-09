import { Exclude, Expose, Transform, Type } from 'class-transformer';

export class UpdateExpenseOutputDTO {
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
