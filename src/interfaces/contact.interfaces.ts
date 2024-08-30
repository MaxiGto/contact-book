import { Address, Phone } from '../entities';
import { PhoneTypeEnum } from '../entities/phoneType.entity';

export interface ICreateContact {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phones: Phone[];
  addresses: Address[];
}

export interface IGetContact {
  id?: number;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  phoneNumber?: string;
  phoneType?: PhoneTypeEnum;
  locality?: string;
  street?: string;
  number?: number;
}

export interface IUpdateContact {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  phones?: Phone[];
  addresses?: Address[];
}

interface IPlainPhoneType {
  typeName: PhoneTypeEnum;
}

interface IPlainPhone {
  number: string;
  phoneType: IPlainPhoneType;
}

interface IPlainAddress {
  locality: string;
  street: string;
  number: number;
  notes?: string;
}

export interface IPlainContact {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phones: IPlainPhone[];
  addresses: IPlainAddress[];
}
