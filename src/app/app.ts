import { createServer } from 'http';
import { PORT } from '../constants/PORT';
import { Color } from '../types/Color';
import { colorizeText } from '../utils/colorizeText';
import { serverHandler } from './serverHandler';

export const app = () => {
  const server = createServer(serverHandler);

  server.listen(PORT, () => {
    console.log('Server started on', colorizeText(Color.yellow, `${PORT}`), 'port');
  });

  process.on('SIGINT', () => {
    server.close(() => process.exit());
  });
};
