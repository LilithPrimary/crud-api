import { validate } from 'uuid';

import { IUser } from '../src/types/IUser';
import { postHandler } from '../src/server/methodsHandler/postHandler';
import { UserFields } from '../src/types/UserFields';
import { UserRequest } from '../src/types/UserRequest';

const usersArray: IUser[] = [];

const user: UserRequest = {
  username: 'test name',
  age: 0,
  hobbies: [],
};

describe('Test POST method', () => {
  beforeEach(() => {
    usersArray.length = 0;
  });

  it('should return object with required fields', () => {
    const result = postHandler(usersArray, user);
    expect(UserFields.Username in result
      && UserFields.Age in result
      && UserFields.Hobbies in result
      && 'id' in result).toBeTruthy();
  });

  it('should add element to user array', () => {
    const arrayLength = usersArray.length;
    postHandler(usersArray, user);
    expect(usersArray.length).toBe(arrayLength + 1);
  });

  it('new user id should be uuid', () => {
    const result = postHandler(usersArray, user);
    expect(validate(result.id)).toBeTruthy();
  });
});
