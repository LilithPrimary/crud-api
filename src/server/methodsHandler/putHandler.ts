import { IUser } from '../../types/IUser';
import { UserRequest } from '../../types/UserRequest';
import { IdValidator } from '../../utils/IdValidator';
import { parseURL } from '../../utils/parseUrl';

export const putHandler = (url: string, users: IUser[], body: UserRequest) => {
  const [, , id] = parseURL(url);

  IdValidator(id, users);

  const user = users.find((el) => el.id === id);

  user.age = body.age;
  user.hobbies = body.hobbies;
  user.username = body.username;

  return { id, ...body };
};
