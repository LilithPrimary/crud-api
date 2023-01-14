import { ErrorMsg } from '../types/ErrorMsg';
import { StatusCode } from '../types/StatusCode';

export const getStatusCode = (error: ErrorMsg) => {
  switch (error) {
    case ErrorMsg.UserIdIsInvalid:
    case ErrorMsg.InvalidBody:
      return StatusCode.InvalidData;

    case ErrorMsg.UserIdDoesntExist:
    case ErrorMsg.NonExistingEndpoint:
      return StatusCode.NotExist;

    case ErrorMsg.NotImplemented:
      return StatusCode.NotImplemented;

    case ErrorMsg.InternalServerError:
    default:
      return StatusCode.ServerError;
  }
};
