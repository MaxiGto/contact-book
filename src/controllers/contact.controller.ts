import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../lib/catchAsync';
import { create, find, remove, update } from '../services/contact.service';
import { ICreateContact, IGetContact } from '../interfaces/contact.interfaces';
import { INumericId } from '../interfaces/common.interfaces';

export const getContacts = catchAsync(async (req: Request<{}, {}, {}, IGetContact>, res: Response) => {
  const contacts = await find(req.query);
  return res.status(httpStatus.OK).json({ contacts, count: contacts.length });
});

export const createContact = catchAsync(async (req: Request<{}, {}, ICreateContact>, res: Response) => {
  const contact = await create(req.body);
  return res.status(httpStatus.CREATED).json(contact);
});

export const updateContact = catchAsync(
  async (req: Request<INumericId, {}, ICreateContact>, res: Response) => {
    const contact = await update(req.params.id, req.body);
    return res.status(httpStatus.OK).json(contact);
  },
);

export const removeContact = catchAsync(async (req: Request<INumericId>, res: Response) => {
  const contact = await remove(req.params.id);
  return res.status(httpStatus.OK).json(contact);
});
