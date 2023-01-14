import { v4 } from 'uuid';
import { ErrorMsg } from '../src/types/ErrorMsg';
import { IUser } from '../src/types/IUser';

import { IdValidator } from '../src/utils/IdValidator';

const id = v4();
const wrongFormatId = `${id}000`;
const wrongId = v4();

const user: IUser = {
  id,
  username: 'test name',
  age: 0,
  hobbies: [],
};

const usersArray: IUser[] = [user];

describe('Test URL Validator', () => {
  it('should throw error when wrong id format', () => {
    const result = () => IdValidator(wrongFormatId, usersArray);
    expect(result).toThrow(Error);
  });

  it(`should throw ${ErrorMsg.UserIdIsInvalid} error when wrong id format`, () => {
    const result = () => IdValidator(wrongFormatId, usersArray);
    expect(result).toThrow(ErrorMsg.UserIdIsInvalid);
  });

  it('should throw error when id doesn\'t exist id exist in user array', () => {
    const result = () => IdValidator(wrongId, usersArray);
    expect(result).toThrow(Error);
  });

  it(`should throw ${ErrorMsg.UserIdDoesntExist} error when id doesn't exist id exist in user array`, () => {
    const result = () => IdValidator(wrongId, usersArray);
    expect(result).toThrow(ErrorMsg.UserIdDoesntExist);
  });

  it('shouldn\'t throw error when id exist in user array', () => {
    const result = () => IdValidator(id, usersArray);
    expect(result).not.toThrow(Error);
  });
});
