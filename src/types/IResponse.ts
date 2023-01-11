import { IUser } from "./IUser.js";

interface IErrorResponse {
  code: number;
  message: string;
}

export type Response = IErrorResponse | IUser | IUser[];


