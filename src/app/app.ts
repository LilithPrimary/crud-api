import { createServer } from 'http';
import { PORT } from '../constants/PORT.js';
import { Response } from '../types/IResponse.js';
import { IUser } from '../types/IUser.js';
import { Methods } from '../types/Methods.js';
import { StatusCode } from '../types/StatusCode.js';
import { getRequestBody } from '../utils/getRequestBody.js';
import { getStatusCode } from '../utils/getStatusCode.js';
import { getHandler } from '../utils/methodsHandler/getHandler.js';
import { postHandler } from '../utils/methodsHandler/postHandler.js';
import { URLValidator } from '../utils/URLValidator.js';

const users: IUser[] = [];

export const app = () => {
  const server = createServer(async (req, res) => {
    console.log(req.url);
    let response: Response;

    res.setHeader('Content-Type', 'application/json');
    const url = req.url;
    const method = <Methods>req.method;
    try {

      URLValidator(url, method);

      let code: number;

      switch (method) {
        case Methods.GET:
          code = StatusCode.Successful200;

          response = getHandler(url, users);

          break;
        case Methods.POST:
          const body = await getRequestBody(req);

          console.log(body);

          code = StatusCode.Successful201;

          response = postHandler(users, body);

          break;

      }

      res.writeHead(code);

    } catch (err) {
      const message = err.message;

      const code = getStatusCode(message);

      response = { code, message };

      res.writeHead(code);

    } finally {
      res.end(JSON.stringify(response));
    }
  });

  server.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`);
  });
};
