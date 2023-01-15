import { IUser } from '../../types/IUser';
import { IdValidator } from '../../utils/IdValidator';
import { parseURL } from '../../utils/parseUrl';

export const deleteHandler = (url: string, users: IUser[]) => {
  const [, , id] = parseURL(url);

  IdValidator(id, users);

  return users.filter((el) => el.id !== id);
};
