import { v4 } from 'uuid';

import { IUser } from '../src/types/IUser';
import { deleteHandler } from '../src/utils/methodsHandler/deleteHandler';
import { BASE_URL } from '../src/constants/BASE_URL';

const id = v4();

const url = `${BASE_URL}/${id}`;

const user: IUser = {
  id,
  username: 'test name',
  age: 0,
  hobbies: [],
};

let usersArray: IUser[] = [user];

describe('Test DELETE method', () => {
  beforeEach(() => {
    usersArray = [user];
  });

  it('should return array without one element', () => {
    const arrayLength = usersArray.length;
    const result = deleteHandler(url, usersArray);

    expect(result.length).toBe(arrayLength - 1);
  });
});
