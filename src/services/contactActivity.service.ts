import { AppDataSource } from '../config/db';
import { ContactActivity } from '../entities';
import { ICreateContactActivity } from '../interfaces/contactActivity.interfaces';
import { findOne } from './contact.service';

export const create = async (createActivity: ICreateContactActivity): Promise<ContactActivity> => {
  const { personId, ...rest } = createActivity;
  const contact = await findOne({ id: personId });
  const contactActivityRepository = AppDataSource.getRepository(ContactActivity);
  const newActivity = contactActivityRepository.create({
    ...rest,
    person: contact,
  });
  await contactActivityRepository.save(newActivity);
  return newActivity;
};
