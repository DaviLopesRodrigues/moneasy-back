import { Exclude, Expose } from 'class-transformer';

export class DeleteUserOutputDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: string;

  @Exclude()
  updatedAt: string;
}
