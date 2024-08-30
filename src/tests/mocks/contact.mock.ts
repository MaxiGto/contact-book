import { PhoneTypeEnum } from '../../entities/phoneType.entity';
import { ICreateContact, IUpdateContact } from '../../interfaces/contact.interfaces';

export const newContact: ICreateContact = {
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  email: 'john.doe@example.com',
  phones: [
    {
      number: '123-456-7890',
      phoneType: {
        typeName: PhoneTypeEnum.MOBILE,
      },
    },
  ],
  addresses: [
    {
      locality: 'Chicago',
      street: 'Broadway',
      number: 123,
      notes: 'Door 3A',
    },
  ],
};

export const updateContact: IUpdateContact = {
  firstName: 'Jane',
  lastName: 'Doe',
  phones: [
    {
      number: '098-765-4321',
      phoneType: { typeName: PhoneTypeEnum.LANDLINE },
    },
  ],
  addresses: [
    {
      locality: 'Los Angeles',
      street: 'Sunset Blvd',
      number: 202,
      notes: 'New Address',
    },
  ],
};
