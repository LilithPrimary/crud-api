import { IUser } from './IUser';

interface IErrorResponse {
  code: number;
  message: string;
}

export type Response = IErrorResponse | IUser | IUser[];
