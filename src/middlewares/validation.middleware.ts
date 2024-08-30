import httpStatus from 'http-status';
import Joi from 'joi';
import { Response } from 'express';

export const handleValidationResult = (res: Response, error: Joi.ValidationError) =>
  res.status(httpStatus.BAD_REQUEST).json({
    error: 'Invalid request data',
    details: error.details.map((detail) => ({
      field: detail.context?.key,
      message: detail.message,
    })),
  });
