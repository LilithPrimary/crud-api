import { ErrorMsg } from '../types/ErrorMsg';
import { UserFields } from '../types/UserFields';
import { UserRequest } from '../types/UserRequest';

const allFieldsInObject = (body: UserRequest) => UserFields.Username in body
  && UserFields.Age in body
  && UserFields.Hobbies in body;

const isFieldsHaveValidType = ({ username, age, hobbies }: UserRequest) => typeof username === 'string'
  && typeof age === 'number'
  && Array.isArray(hobbies);

export const bodyValidator = (body: UserRequest) => {
  if (!allFieldsInObject(body)
    || Object.keys(body).length > 3
    || !isFieldsHaveValidType(body)) {
    throw new Error(ErrorMsg.InvalidBody);
  }
};
