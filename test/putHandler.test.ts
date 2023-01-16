import { v4 } from 'uuid';

import { IUser } from '../src/types/IUser';
import { putHandler } from '../src/server/methodsHandler/putHandler';
import { BASE_URL } from '../src/constants/BASE_URL';
import { UserRequest } from '../src/types/UserRequest';
import { UserFields } from '../src/types/UserFields';

const id = v4();

const url = `${BASE_URL}/${id}`;

const user: IUser = {
  id,
  username: 'test name',
  age: 0,
  hobbies: [],
};

const newUserData: UserRequest = {
  username: 'other test name',
  age: 1,
  hobbies: ['test hobby'],
};

let usersArray: IUser[] = [user];

describe('Test PUT method', () => {
  beforeEach(() => {
    usersArray = [{
      id,
      username: 'test name',
      age: 0,
      hobbies: [],
    }];
  });

  it('should return object with required fields', () => {
    const result = putHandler(url, usersArray, newUserData);

    expect(UserFields.Username in result
      && UserFields.Age in result
      && UserFields.Hobbies in result
      && 'id' in result).toBeTruthy();
  });

  it('should return object with new fields data', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...result } = putHandler(url, usersArray, newUserData);
    expect(result).toStrictEqual(newUserData);
  });

  it('should return object with same id', () => {
    const { id: newId } = putHandler(url, usersArray, newUserData);
    expect(newId).toBe(id);
  });
});
