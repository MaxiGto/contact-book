import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import httpStatus from 'http-status';

import {
  createContactSchema,
  deleteContactSchema,
  getContactSchema,
  updateContactSchema,
} from '../validations/contact.validation';

const handleValidationResult = (
  error: Joi.ValidationError | undefined,
  res: Response,
  next: NextFunction,
) => {
  if (error)
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.details.map((detail) => detail.message) });

  return next();
};

export const validateGetContact = (req: Request, res: Response, next: NextFunction) => {
  const { error } = getContactSchema.validate(req.query);
  handleValidationResult(error, res, next);
};

export const validateCreateContact = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createContactSchema.validate(req.body);
  handleValidationResult(error, res, next);
};

export const validateUpdateContact = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateContactSchema.validate(req.body);
  handleValidationResult(error, res, next);
};

export const validateDeleteContact = (req: Request, res: Response, next: NextFunction) => {
  const { error } = deleteContactSchema.validate(req.params);
  handleValidationResult(error, res, next);
};
