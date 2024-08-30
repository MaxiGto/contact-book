import Joi from 'joi';

import {
  ICreateContactActivity,
  IGetContactActivityParams,
  IGetContactActivityQuery,
} from '../interfaces/contactActivity.interfaces';
import { ContactActivityType } from '../entities/contactActivity.entity';

export const createContactActivitySchema = Joi.object<ICreateContactActivity>({
  personId: Joi.number().integer().positive().required(),
  activityType: Joi.string()
    .valid(ContactActivityType.Call, ContactActivityType.Email, ContactActivityType.Meeting)
    .required(),
  activityDate: Joi.date().iso().required(),
  description: Joi.string().min(1),
});

export const getContactActivitySchema = {
  params: Joi.object<IGetContactActivityParams>().keys({
    personId: Joi.number().integer().positive().required(),
  }),
  query: Joi.object<IGetContactActivityQuery>().keys({
    type: Joi.string().valid(
      ContactActivityType.Call,
      ContactActivityType.Email,
      ContactActivityType.Meeting,
    ),
  }),
};
