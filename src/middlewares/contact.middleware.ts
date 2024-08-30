import { NextFunction, Request, Response } from 'express';

import {
  createContactSchema,
  deleteContactSchema,
  getContactSchema,
  updateContactSchema,
} from '../validations/contact.validation';
import { handleValidationResult } from './validation.middleware';

export const validateGetContact = (req: Request, res: Response, next: NextFunction) => {
  const { error } = getContactSchema.validate(req.query);
  if (error) return handleValidationResult(res, error);
  return next();
};

export const validateCreateContact = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createContactSchema.validate(req.body);
  if (error) return handleValidationResult(res, error);
  return next();
};

export const validateUpdateContact = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateContactSchema.validate(req.body);
  if (error) return handleValidationResult(res, error);
  return next();
};

export const validateDeleteContact = (req: Request, res: Response, next: NextFunction) => {
  const { error } = deleteContactSchema.validate(req.params);
  if (error) return handleValidationResult(res, error);
  return next();
};
