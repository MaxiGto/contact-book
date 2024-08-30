import { NextFunction, Request, Response } from 'express';

import { handleValidationResult } from './validation.middleware';
import { createContactActivitySchema } from '../validations/contactActivity.validation';

export const validateCreateContactActivity = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createContactActivitySchema.validate(req.body);

  handleValidationResult(error, res, next);
};
