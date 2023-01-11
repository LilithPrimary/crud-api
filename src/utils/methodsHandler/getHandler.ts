import { IUser } from "../../types/IUser.js";
import { IdValidator } from "../IdValidator.js";
import { parseURL } from "../parseUrl.js";

export const getHandler = (url: string, users: IUser[]) => {
  const [, , id] = parseURL(url);
  if (id) {
    IdValidator(id, users);
    return users.find((user) => user.id === id);
  }
  return users;
};
