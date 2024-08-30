import { Person } from '../entities';
import { IQueryCondition } from '../interfaces/common.interfaces';
import { IGetContact, IPlainContact } from '../interfaces/contact.interfaces';

export type SearchConditions = {
  [K in keyof IGetContact]?: IQueryCondition<IGetContact[K]>;
};
export const getSearchConditions = ({
  id,
  firstName,
  lastName,
  dateOfBirth,
  email,
  phoneNumber,
  phoneType,
  locality,
  street,
  number,
}: IGetContact) => {
  const searchConditions: SearchConditions = {
    ...(id && {
      id: { condition: 'person.id = :id', value: id },
    }),
    ...(firstName && {
      firstName: { condition: 'UPPER(person.firstName) = UPPER(:firstName)', value: firstName },
    }),
    ...(lastName && {
      lastName: { condition: 'UPPER(person.lastName) = UPPER(:lastName)', value: lastName },
    }),
    ...(dateOfBirth && {
      dateOfBirth: { condition: 'person.dateOfBirth = :dateOfBirth', value: dateOfBirth },
    }),
    ...(email && { email: { condition: 'UPPER(person.email) = UPPER(:email)', value: email } }),
    ...(phoneNumber && {
      phoneNumber: { condition: 'UPPER(phone.number) = UPPER(:phoneNumber)', value: phoneNumber },
    }),
    ...(phoneType && {
      phoneType: { condition: 'phoneType.typeName = :phoneType', value: phoneType },
    }),
    ...(locality && {
      locality: { condition: 'UPPER(address.locality) = UPPER(:locality)', value: locality },
    }),
    ...(street && {
      street: { condition: 'UPPER(address.street) = UPPER(:street)', value: street },
    }),
    ...(number && {
      number: { condition: 'address.number = :number', value: number },
    }),
  };
  return searchConditions;
};

export const getPlainContact = (contact: Person): IPlainContact => {
  return {
    ...contact,
    phones: contact.phones.map(({ id, ...phoneRest }) => ({
      ...phoneRest,
      phoneType: { typeName: phoneRest.phoneType.typeName },
    })),
    addresses: contact.addresses.map(({ id, ...addressRest }) => ({ ...addressRest })),
  };
};
