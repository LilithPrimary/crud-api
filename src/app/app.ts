import { createServer } from 'http';
import { isMultiMode } from '../utils/isMultiMode';
import { balancer } from './balancer';
import { serverHandler } from '../server/serverHandler';
import { PORT } from '../constants/PORT';
import { colorizeText } from '../utils/colorizeText';
import { Color } from '../types/Color';

export const app = () => {
  const server = createServer(serverHandler);

  if (isMultiMode()) {
    balancer(server);
  } else {
    server.listen(PORT, () => console.log('Server started on', colorizeText(Color.yellow, `${PORT}`), 'port'));
  }

  process.on('SIGINT', () => {
    server.close(() => process.exit());
  });
};
