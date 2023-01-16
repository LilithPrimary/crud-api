import { IUser } from './IUser';
import { UserFields } from './UserFields';

export type UserRequest = Omit<IUser, UserFields.Id>;
