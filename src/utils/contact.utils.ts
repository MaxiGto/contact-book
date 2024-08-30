import { SelectQueryBuilder } from 'typeorm';
import { IQueryCondition } from '../interfaces/common.interfaces';
import { IGetContact } from '../interfaces/contact.interfaces';
import { Person } from '../entities';

export const getSearchConditions = ({
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
  const searchConditions: Record<string, IQueryCondition> = {
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
export const loadQuery = (
  query: SelectQueryBuilder<Person>,
  searchConditions: Record<string, IQueryCondition>,
): SelectQueryBuilder<Person> => {
  Object.entries(searchConditions).forEach(([key, { condition, value }]) => {
    query.andWhere(condition, { [key]: value });
  });
  return query;
};
