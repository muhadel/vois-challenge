export interface IUser {
  id?: number;
  name: string;
  email: string;
  readonly password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
