import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';

import { errorConverter, errorHandler } from './middlewares/error.middleware';
import routes from './routes/index.routes';
import ApiError from './lib/ApiError';

const app = express();

// Set security HTTP headers
app.use(helmet());

// Enable cors
app.use(cors());
app.options('*', cors());

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Sanitize request data
app.use(xss());

// Gzip compression
app.use(compression());

// V1 api routes
app.use('/api/v1', routes);

// Expose public folder
app.use('/public', express.static('src/public'));

// Send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
