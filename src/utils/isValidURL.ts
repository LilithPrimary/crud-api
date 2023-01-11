import { BASE_URL } from "../constants/BASE_URL.js";
import { ErrorMsg } from "../types/ErrorMsg.js";

export const isValidURL = (url: string) => {
  const parsedURL = url.split('/');
  if (!url.startsWith(BASE_URL) || parsedURL.length > 3) {
    throw new Error(ErrorMsg.NonExistingEndpoint);
  }
};
