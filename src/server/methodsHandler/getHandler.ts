import { IUser } from '../../types/IUser';
import { IdValidator } from '../../utils/IdValidator';
import { parseURL } from '../../utils/parseUrl';

export const getHandler = (url: string, users: IUser[]) => {
  const [, , id] = parseURL(url);
  if (id) {
    IdValidator(id, users);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return users.find((user) => user.id === id)!;
  }
  return users;
};
