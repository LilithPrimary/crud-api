import { IncomingMessage } from "http";
import { JSONValidator } from "./JSONValidator.js";

export const getRequestBody = async (req: IncomingMessage) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const body = Buffer.concat(buffers).toString();

  console.log('getBody', body);

  return JSONValidator(body);
};
