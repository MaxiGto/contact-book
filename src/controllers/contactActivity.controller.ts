import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../lib/catchAsync';
import { create, find } from '../services/contactActivity.service';
import {
  ICreateContactActivity,
  IGetContactActivityParams,
  IGetContactActivityQuery,
} from '../interfaces/contactActivity.interfaces';

export const getContactActivity = catchAsync(
  async (req: Request<IGetContactActivityParams, {}, {}, IGetContactActivityQuery>, res: Response) => {
    const contactActivities = await find(req.params.personId, req.query.type);
    return res.status(httpStatus.OK).json(contactActivities);
  },
);

export const createContactActivity = catchAsync(
  async (req: Request<{}, {}, ICreateContactActivity>, res: Response) => {
    const contactActivity = await create(req.body);
    return res.status(httpStatus.CREATED).json(contactActivity);
  },
);
