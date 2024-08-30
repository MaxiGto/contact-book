import httpStatus from 'http-status';
import Joi from 'joi';
import ApiError from '../lib/ApiError';

export const handleValidationResult = (error: Joi.ValidationError | undefined) => {
  if (!error) return;

  throw new ApiError(
    httpStatus.BAD_REQUEST,
    JSON.stringify({
      error: 'Invalid request data',
      details: error.details.map((detail) => ({
        field: detail.context?.key,
        message: detail.message,
      })),
    }),
  );
};
