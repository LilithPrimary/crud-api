import { v4 } from 'uuid';

import { IUser } from '../../types/IUser';
import { UserRequest } from '../../types/UserRequest';

export const postHandler = (users: IUser[], body: UserRequest) => {
  const id = v4();

  const user = { id, ...body };

  users.push(user);

  return user;
};
