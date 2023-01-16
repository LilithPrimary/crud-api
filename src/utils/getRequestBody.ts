import { IncomingMessage } from 'http';
import { bodyValidator } from './BodyValidator';
import { JSONValidator } from './JSONValidator';

export const getRequestBody = async (req: IncomingMessage) => {
  const buffers = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const bodyRaw = Buffer.concat(buffers).toString();

  const body = JSONValidator(bodyRaw);

  bodyValidator(body);

  return body;
};
