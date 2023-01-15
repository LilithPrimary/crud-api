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
import { deleteHandler } from './methodsHandler/deleteHandler';
import { getHandler } from './methodsHandler/getHandler';
import { postHandler } from './methodsHandler/postHandler';
import { putHandler } from './methodsHandler/putHandler';
import { URLValidator } from '../utils/URLValidator';

export const methodsHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  incomingUsers: IUser[],
) => {
  let users = incomingUsers;
  let response: Response = null;
  let code: number;
  const { url } = req;
  const method = <Methods>req.method;

  try {
    URLValidator(url, method);
    switch (method) {
      case Methods.GET:
        console.log(colorizeText(Color.lightblue, `[${Methods.GET}]`), colorizeText(Color.yellow, `${url}`), colorizeText(Color.red, `Process id: ${process.pid}`));

        code = StatusCode.Successful200;

        response = getHandler(url, users);
        break;

      case Methods.POST: {
        const body = await getRequestBody(req);

        console.log(colorizeText(Color.lightblue, `[${Methods.POST}]`), colorizeText(Color.yellow, `${url}`), body, colorizeText(Color.red, `Process id: ${process.pid}`));

        code = StatusCode.Successful201;

        response = postHandler(users, body);
        break;
      }

      case Methods.PUT: {
        const body = await getRequestBody(req);

        console.log(colorizeText(Color.lightblue, `[${Methods.PUT}]`), colorizeText(Color.yellow, `${url}`), body, colorizeText(Color.red, `Process id: ${process.pid}`));

        response = putHandler(url, users, body);

        code = StatusCode.Successful200;

        break;
      }

      case Methods.DELETE: {
        console.log(
          colorizeText(
            Color.lightblue,
            `[${Methods.DELETE}]`,
          ),
          colorizeText(Color.yellow, `${url}`),

          colorizeText(Color.red, `Process id: ${process.pid}`),
        );

        users = deleteHandler(url, users);

        code = StatusCode.Successful204;

        break;
      }

      default:
        throw new Error(ErrorMsg.NotImplemented);
    }
  } catch (err) {
    response = errorHandler(err.message);
    code = response.code;
  } finally {
    res.writeHead(code);
    res.end(JSON.stringify(response));
  }
  return users;
};
