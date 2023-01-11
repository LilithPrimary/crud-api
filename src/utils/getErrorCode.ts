import { ErrorMsg } from "../types/ErrorMsg.js";
import { StatusCode } from "../types/StatusCode.js";

export const getErrorCode = (error: ErrorMsg) => {
  switch (error) {
    case ErrorMsg.UserIdIsInvalid:
    case ErrorMsg.InvalidBody:
      return StatusCode.InvalidData;
    case ErrorMsg.UserIdDoesntExist:
    case ErrorMsg.NonExistingEndpoint:
      return StatusCode.NotExist;
    case ErrorMsg.InternalServerError:
      // default:
      return StatusCode.ServerError;
  }
};
