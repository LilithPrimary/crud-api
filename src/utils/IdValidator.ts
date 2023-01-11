import { validate } from 'uuid';

import { ErrorMsg } from '../types/ErrorMsg.js';
import { IUser } from '../types/IUser.js';

export const IdValidator = (id: string, users: IUser[]) => {
  if (!validate(id)) {
    throw new Error(ErrorMsg.UserIdIsInvalid);
  }
  if (!users.some((user) => user.id === id)) {
    throw new Error(ErrorMsg.UserIdDoesntExist);
  }
};
