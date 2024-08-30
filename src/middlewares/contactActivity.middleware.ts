import { NextFunction, Request, Response } from 'express';

import { handleValidationResult } from './validation.middleware';
import {
  createContactActivitySchema,
  getContactActivitySchema,
} from '../validations/contactActivity.validation';

export const validateGetContactActivities = (req: Request, res: Response, next: NextFunction) => {
  const { error: paramsError } = getContactActivitySchema.params.validate(req.params);
  if (paramsError) return handleValidationResult(res, paramsError);

  const { error: queryError } = getContactActivitySchema.query.validate(req.query);
  if (queryError) return handleValidationResult(res, queryError);

  return next();
};

export const validateCreateContactActivity = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createContactActivitySchema.validate(req.body);

  if (error) return handleValidationResult(res, error);

  return next();
};
