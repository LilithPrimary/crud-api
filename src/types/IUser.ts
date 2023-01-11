import { UserFields } from "./UserFields";

export interface IUser {
  [UserFields.Id]: string;
  [UserFields.Username]: string;
  [UserFields.Age]: number;
  [UserFields.Hobbies]: string[];
}
