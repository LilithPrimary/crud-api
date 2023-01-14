import { ErrorMsg } from '../types/ErrorMsg';
import { StatusCode } from '../types/StatusCode';
import { getStatusCode } from './getStatusCode';

export const errorHandler = (message: ErrorMsg) => {
  const code = getStatusCode(message);

  return {
    code,
    message: code === StatusCode.ServerError
      ? ErrorMsg.InternalServerError
      : message,
  };
};
