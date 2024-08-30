import { Server } from 'http';
import app from './app';
import config from './config/config';
import { AppDataSource } from './config/db';

let server: Server;

/* eslint-disable no-console */

AppDataSource.initialize()
  .then(() => {
    console.log('Successfully connected to the database');
    server = app.listen(config.port, () => {
      console.log(`Listening to port ${config.port}`);
    });
  })
  .catch((error: unknown) => {
    console.log('Error during database connection', error);
    process.exit(1);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
