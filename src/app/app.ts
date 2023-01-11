import { createServer } from 'http';
import { IResponse } from '../types/IResponse.js';
import { getErrorCode } from '../utils/getErrorCode.js';
import { isValidURL } from '../utils/isValidURL.js';

export const app = () => {
  const server = createServer((req, res) => {
    console.log(req.url);
    let response: IResponse;

    res.setHeader('Content-Type', 'application/json');
    const url = req.url;
    try {
      isValidURL(url);
      response = { code: 200, message: 'ok' };
      res.writeHead(200);
    } catch (err) {
      const message = err.message;

      const code = getErrorCode(message);

      response = { code, message };

      res.writeHead(code);
    } finally {
      res.end(JSON.stringify(response));
    }
  });

  server.listen(3000, () => {
    console.log('Server started on 3000 port');
  });
};
