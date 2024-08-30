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

export interface ICreateContact {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phones: IPlainPhone[];
  addresses: IPlainAddress[];
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

export interface IPlainContact extends ICreateContact {
  id: number;
}

export interface IUpdateContact {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  phones?: IPlainPhone[];
  addresses?: IPlainAddress[];
}
