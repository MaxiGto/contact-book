import { NextFunction, Request, Response } from 'express';

import {
  createContactSchema,
  deleteContactSchema,
  getContactSchema,
  updateContactSchema,
} from '../validations/contact.validation';
import { handleValidationResult } from './validation.middleware';

export const validateGetContact = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = getContactSchema.validate(req.query);
  handleValidationResult(error);
  return next();
};

export const validateCreateContact = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = createContactSchema.validate(req.body);
  handleValidationResult(error);
  return next();
};

export const validateUpdateContact = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = updateContactSchema.validate(req.body);
  handleValidationResult(error);
  return next();
};

export const validateDeleteContact = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = deleteContactSchema.validate(req.params);
  handleValidationResult(error);
  return next();
};
