import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../lib/catchAsync';
import { create } from '../services/contactActivity.service';
import { ICreateContactActivity } from '../interfaces/contactActivity.interfaces';

export const createContactActivity = catchAsync(
  async (req: Request<{}, {}, ICreateContactActivity>, res: Response) => {
    const contactActivity = await create(req.body);
    return res.status(httpStatus.OK).json(contactActivity);
  },
);
