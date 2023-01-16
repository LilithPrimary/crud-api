import { v4 } from 'uuid';

import { IUser } from '../src/types/IUser';
import { getHandler } from '../src/server/methodsHandler/getHandler';
import { BASE_URL } from '../src/constants/BASE_URL';
import { UserFields } from '../src/types/UserFields';

const emptyUsersArray: IUser[] = [];

const url = BASE_URL;

const id = v4();

const user: IUser = {
  id,
  username: 'test name',
  age: 0,
  hobbies: [],
};

const usersArray: IUser[] = [user];

describe('Test GET method', () => {
  it('should return array if url without id', () => {
    const result = getHandler(url, emptyUsersArray);
    expect(Array.isArray(result)).toBeTruthy();
  });

  it('should return empty array', () => {
    const result = getHandler(url, emptyUsersArray);
    expect(result).toStrictEqual(emptyUsersArray);
  });

  it('should return object with required fields when id in url', () => {
    const result = getHandler(`${url}/${id}`, usersArray);
    expect(UserFields.Username in result
      && UserFields.Age in result
      && UserFields.Hobbies in result).toBeTruthy();
  });

  it('should return right user', () => {
    const result = getHandler(`${url}/${id}`, usersArray);
    expect(result).toStrictEqual(user);
  });
});
