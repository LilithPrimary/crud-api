import { app } from './app/app';

app();

process.on('SIGINT', () => {
  process.exit();
});
