import { IncomingMessage, ServerResponse } from 'http';

import { Color } from '../types/Color';
import { ErrorMsg } from '../types/ErrorMsg';
import { Response } from '../types/IResponse';
import { IUser } from '../types/IUser';
import { Methods } from '../types/Methods';
import { StatusCode } from '../types/StatusCode';
import { colorizeText } from '../utils/colorizeText';
import { errorHandler } from '../utils/errorHandler';
import { getRequestBody } from '../utils/getRequestBody';
import { deleteHandler } from '../utils/methodsHandler/deleteHandler';
import { getHandler } from '../utils/methodsHandler/getHandler';
import { postHandler } from '../utils/methodsHandler/postHandler';
import { putHandler } from '../utils/methodsHandler/putHandler';
import { URLValidator } from '../utils/URLValidator';

let users: IUser[] = [];

export const serverHandler = async (req: IncomingMessage, res: ServerResponse) => {
  let response: Response = null;
  let code: number;
  const { url } = req;
  const method = <Methods>req.method;
  res.setHeader('Content-Type', 'application/json');

  try {
    URLValidator(url, method);

    switch (method) {
      case Methods.GET:
        console.log(colorizeText(Color.lightblue, `[${Methods.GET}]`), colorizeText(Color.yellow, `${url}`));

        code = StatusCode.Successful200;

        response = getHandler(url, users);
        break;

      case Methods.POST: {
        const body = await getRequestBody(req);

        console.log(body);

        console.log(colorizeText(Color.lightblue, `[${Methods.POST}]`), colorizeText(Color.yellow, `${url}`), body);

        code = StatusCode.Successful201;

        response = postHandler(users, body);
        break;
      }

      case Methods.PUT: {
        const body = await getRequestBody(req);

        console.log(colorizeText(Color.lightblue, `[${Methods.PUT}]`), colorizeText(Color.yellow, `${url}`), body);

        response = putHandler(url, users, body);

        code = StatusCode.Successful200;

        break;
      }

      case Methods.DELETE: {
        console.log(colorizeText(Color.lightblue, `[${Methods.DELETE}]`), colorizeText(Color.yellow, `${url}`));

        users = deleteHandler(url, users);

        code = StatusCode.Successful204;

        break;
      }

      default:
        throw new Error(ErrorMsg.NotImplemented);
    }

    res.writeHead(code);
  } catch (err) {
    response = errorHandler(err.message);

    res.writeHead(response.code);
  } finally {
    res.end(JSON.stringify(response));
  }
};
