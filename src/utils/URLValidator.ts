import { BASE_URL } from "../constants/BASE_URL.js";
import { ErrorMsg } from "../types/ErrorMsg.js";
import { Methods } from "../types/Methods.js";
import { parseURL } from "./parseUrl.js";

const checkURL = (url: string, method: Methods, parsedURL: string[]) =>
  !url.startsWith(BASE_URL)
  || parsedURL.length > 3
  || (method === Methods.POST && parseURL.length > 2)
  || ((method === Methods.PUT || method === Methods.DELETE) && parseURL.length !== 3);

export const URLValidator = (url: string, method: Methods) => {
  if (checkURL(url, method, parseURL(url))) {
    throw new Error(ErrorMsg.NonExistingEndpoint);
  }
};
