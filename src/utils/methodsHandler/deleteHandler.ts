import { IUser } from '../../types/IUser';
import { IdValidator } from '../IdValidator';
import { parseURL } from '../parseUrl';

export const deleteHandler = (url: string, users: IUser[]) => {
  const [, , id] = parseURL(url);

  IdValidator(id, users);

  return users.filter((el) => el.id !== id);
};
