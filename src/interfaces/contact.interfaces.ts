import { PhoneTypeEnum } from '../entities/phoneType.entity';

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

export interface IActivityPlainContact {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
}

export interface ICreateContact extends IActivityPlainContact {
  phones: IPlainPhone[];
  addresses: IPlainAddress[];
}

export interface IPlainContact extends ICreateContact {
  id: number;
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
  phones?: IPlainPhone[];
  addresses?: IPlainAddress[];
}
