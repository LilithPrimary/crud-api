import { ErrorMsg } from "../types/ErrorMsg.js";
import { UserFields } from "../types/UserFields.js";
import { UserRequest } from "../types/UserRequest.js";

const allFieldsInObject = (body: UserRequest) => UserFields.Username in body && UserFields.Age in body && UserFields.Hobbies in body;

export const bodyValidator = (body: UserRequest) => {
  if (!allFieldsInObject(body) || Object.keys(body).length > 3) {
    throw new Error(ErrorMsg.InvalidBody);
  }
};
