import { v4 } from 'uuid';

import { IUser } from "../../types/IUser.js";
import { UserRequest } from "../../types/UserRequest.js";

export const postHandler = (users: IUser[], body: UserRequest) => {
  const id = v4();

  return { id, ...body };
};
