import { IUser } from "./IUser.js";
import { UserFields } from "./UserFields.js";

export type UserRequest = Omit<IUser, UserFields.Id>;
