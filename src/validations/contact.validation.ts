import Joi from 'joi';
import { dateOfBirth, phoneNumber } from './custom.validation';
import { PhoneTypeEnum } from '../entities/phoneType.entity';
import { ICreateContact, IGetContact } from '../interfaces/contact.interfaces';
import { INumericId } from '../interfaces/common.interfaces';

export const getContactSchema = Joi.object<IGetContact>({
  id: Joi.number().integer().positive(),
  firstName: Joi.string().min(1),
  lastName: Joi.string().min(1),
  dateOfBirth: Joi.string().custom(dateOfBirth),
  email: Joi.string().email(),
  phoneNumber: Joi.string().custom(phoneNumber),
  locality: Joi.string().min(1),
  street: Joi.string().min(1),
  number: Joi.number().integer().positive(),
  phoneType: Joi.string().valid(PhoneTypeEnum.LANDLINE, PhoneTypeEnum.MOBILE),
});

const phoneTypeSchema = Joi.object({
  typeName: Joi.string().valid(PhoneTypeEnum.LANDLINE, PhoneTypeEnum.MOBILE).required(),
});

const phoneSchema = Joi.object({
  number: Joi.string().custom(phoneNumber).required(),
  phoneType: phoneTypeSchema.required(),
});

const addressSchema = Joi.object({
  locality: Joi.string().min(1).required(),
  street: Joi.string().min(1).required(),
  number: Joi.number().integer().positive().required(),
  notes: Joi.string().allow(''),
});

export const createContactSchema = Joi.object<ICreateContact>({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  dateOfBirth: Joi.string().custom(dateOfBirth).required(),
  email: Joi.string().email().required(),
  phones: Joi.array().items(phoneSchema).min(1).required(),
  addresses: Joi.array().items(addressSchema).min(1).required(),
});

export const updateContactSchema = Joi.object({
  firstName: Joi.string().min(1),
  lastName: Joi.string().min(1),
  dateOfBirth: Joi.string().custom(dateOfBirth),
  email: Joi.string().email(),
  phones: Joi.array().items(phoneSchema).min(1),
  addresses: Joi.array().items(addressSchema).min(1),
});

export const deleteContactSchema = Joi.object<INumericId>({
  id: Joi.number().integer().positive().required(),
});
