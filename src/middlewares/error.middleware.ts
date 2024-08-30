/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import httpStatus from 'http-status';

import config from '../config/config';
import ApiError from '../lib/ApiError';

export const errorConverter = (err: any, _req: Request, _res: Response, next: any) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    let message: string = error.message || `${httpStatus[statusCode]}`;
    message = message.replaceAll('"', '');

    error = new ApiError(statusCode, message, '', false, err.stack);
  }
  next(error);
};

export const errorHandler = (err: ApiError, _req: Request, res: Response, _next: any) => {
  let { statusCode, message, code } = err;
  const { success } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = 'Internal Server Error';
    code = 'internal-server-error';
  }

  const response = {
    success,
    statusCode,
    message: message || 'Unknown error',
    code: code || undefined,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).send(response);
};
