import httpStatus from 'http-status';
import { FindOptionsWhere } from 'typeorm';

import { AppDataSource } from '../config/db';
import ApiError from '../lib/ApiError';
import { Address, Person, Phone, PhoneType } from '../entities';
import { ICreateContact, IGetContact, IUpdateContact } from '../interfaces/contact.interfaces';
import { getSearchConditions } from '../utils/contact.utils';
import { loadQuery } from '../utils/common.utils';

export const findOne = async (condition: FindOptionsWhere<Person>): Promise<Person> => {
  const contact = await AppDataSource.getRepository(Person).findOneBy(condition);
  if (!contact) throw new ApiError(httpStatus.NOT_FOUND, 'Contact does not exist');
  return contact;
};

export const find = async (getContact: IGetContact): Promise<Person[]> => {
  let query = AppDataSource.getRepository(Person)
    .createQueryBuilder('person')
    .leftJoinAndSelect('person.phones', 'phone')
    .leftJoinAndSelect('phone.phoneType', 'phoneType')
    .leftJoinAndSelect('person.addresses', 'address');
  const searchConditions = getSearchConditions(getContact);
  query = loadQuery<Person>(query, searchConditions);
  const contacts = await query.getMany();
  return contacts;
};

export const create = async (createContact: ICreateContact): Promise<Person> => {
  const { phones, addresses, ...rest } = createContact;
  const contactRepository = AppDataSource.getRepository(Person);
  const contact = await contactRepository.findOneBy({ email: createContact.email });
  if (contact) throw new ApiError(httpStatus.BAD_REQUEST, 'Contact email already registered');
  const newContact = contactRepository.create({
    ...rest,
    phones: await Promise.all(
      phones.map(async (phone) => {
        let phoneType = await AppDataSource.getRepository(PhoneType).findOne({
          where: { typeName: phone.phoneType.typeName },
        });

        if (!phoneType) {
          phoneType = AppDataSource.getRepository(PhoneType).create({ typeName: phone.phoneType.typeName });
          phoneType = await AppDataSource.getRepository(PhoneType).save(phoneType);
        }

        return AppDataSource.getRepository(Phone).create({ number: phone.number, phoneType });
      }),
    ),
    addresses: addresses.map((address) => AppDataSource.getRepository(Address).create(address)),
  });
  await contactRepository.save(newContact);
  return newContact;
};

export const update = async (id: number, updateContact: IUpdateContact): Promise<IUpdateContact> => {
  const contact = await AppDataSource.getRepository(Person).findOne({
    where: { id },
    relations: ['phones', 'phones.phoneType', 'addresses'],
  });
  if (!contact) throw new ApiError(httpStatus.NOT_FOUND, 'Contact does not exist');
  if (updateContact.phones) {
    const phoneRepository = AppDataSource.getRepository(Phone);
    await phoneRepository.delete({ person: { id } });
  }

  if (updateContact.addresses) {
    const addressRepository = AppDataSource.getRepository(Address);
    await addressRepository.delete({ person: { id } });
  }
  const updatedContact = { ...contact, ...updateContact };
  await AppDataSource.getRepository(Person).save(updatedContact);
  return updatedContact;
};

export const remove = async (id: number): Promise<Person> => {
  const contact = await findOne({ id });
  await AppDataSource.getRepository(Person).remove(contact);
  return contact;
};
