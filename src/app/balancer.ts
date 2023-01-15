import { Server } from 'http';
import cluster from 'cluster';
import { cpus } from 'os';

import { PORT } from '../constants/PORT';
import { Color } from '../types/Color';
import { colorizeText } from '../utils/colorizeText';
import { UsersST } from '../users/UsersST';
import { WorkerCmd } from '../types/WorkerCmd';

export const balancer = (server: Server) => {
  const users = UsersST.getInstance();

  if (cluster.isPrimary) {
    const numCPUs = cpus();

    console.log(`Primary ${process.pid} is running`);

    let workers = numCPUs.map(() => cluster.fork({ WORKER_PORT: PORT }));

    cluster.on('exit', (worker) => {
      console.log(`worker ${worker.process.pid} died`);
      workers = [
        ...workers.filter((el) => el.process.pid !== worker.process.pid),
        cluster.fork({ WORKER_PORT: PORT }),
      ];
    });

    cluster.on('message', (worker, msg) => {
      if (msg.action === WorkerCmd.sendUsers) {
        users.users = msg.users;
      }
      if (msg.action === WorkerCmd.getUsers) {
        worker.send(users.users);
      }
    });
  } else {
    const workerPort = process.env.WORKER_PORT;
    server.listen(workerPort, () => {
      console.log(`Worker ${process.pid} started server on`, colorizeText(Color.yellow, `${workerPort}`), 'port');
    });
  }
};
