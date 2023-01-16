import { ErrorMsg } from '../types/ErrorMsg';

export const JSONValidator = (json: string) => {
  try {
    const data = JSON.parse(json);
    return data;
  } catch (_) {
    throw new Error(ErrorMsg.InvalidBody);
  }
};
