import { IncomingMessage, ServerResponse } from 'http';
import cluster from 'cluster';

import { IUser } from '../types/IUser';
import { methodsHandler } from './methodsHandler';
import { WorkerCmd } from '../types/WorkerCmd';
import { UsersST } from '../users/UsersST';

export const serverHandler = async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Content-Type', 'application/json');

  if (cluster.isWorker) {
    process.send({ action: WorkerCmd.getUsers });

    process.once('message', async (msg) => {
      const users = await methodsHandler(req, res, msg as IUser[]);
      process.send({ action: 'send users', users });
    });
  } else {
    const users = UsersST.getInstance();
    users.users = await methodsHandler(req, res, users.users);
  }
};
