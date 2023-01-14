import { ErrorMsg } from '../types/ErrorMsg';
import { UserFields } from '../types/UserFields';
import { UserRequest } from '../types/UserRequest';

const allFieldsInObject = (body: UserRequest) => UserFields.Username in body
  && UserFields.Age in body
  && UserFields.Hobbies in body;

export const bodyValidator = (body: UserRequest) => {
  if (!allFieldsInObject(body) || Object.keys(body).length > 3) {
    throw new Error(ErrorMsg.InvalidBody);
  }
};
