import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';

export const handleValidationResult = (
  error: Joi.ValidationError | undefined,
  res: Response,
  next: NextFunction,
) => {
  if (error)
    return res.status(httpStatus.BAD_REQUEST).json({
      error: 'Invalid request data',
      details: error.details.map((detail) => ({
        field: detail.context?.key,
        message: detail.message,
      })),
    });

  return next();
};
