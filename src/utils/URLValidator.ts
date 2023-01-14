import { BASE_URL } from '../constants/BASE_URL';
import { ErrorMsg } from '../types/ErrorMsg';
import { Methods } from '../types/Methods';
import { parseURL } from './parseUrl';

const checkURL = (url: string, method: Methods, parsedURL: string[]) => !url.startsWith(BASE_URL)
  || parsedURL.length > 3
  || (method === Methods.POST && parsedURL.length > 2)
  || ((method === Methods.PUT || method === Methods.DELETE) && parsedURL.length !== 3)
  || (method === Methods.GET && parsedURL.length === 3 && !parsedURL[2]);

export const URLValidator = (url: string, method: Methods) => {
  if (checkURL(url, method, parseURL(url))) {
    throw new Error(ErrorMsg.NonExistingEndpoint);
  }
};
