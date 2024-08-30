import { ContactActivityType, ContactActivity } from '../entities/contactActivity.entity';
import { IActivityPlainContact } from './contact.interfaces';

interface IContactActivity {
  activityType: ContactActivityType;
  activityDate: string;
  description?: string;
}

export interface ICreateContactActivity extends IContactActivity {
  personId: number;
}

export interface IGetContactActivityParams {
  personId: number;
}

export interface IGetContactActivityQuery {
  type: ContactActivityType;
}

export interface IGetContactActivityResult {
  contact: IActivityPlainContact;
  contactActivities: ContactActivity[];
}

export interface ICreateContactActivityResult extends IContactActivity {
  id: number;
  contact: IActivityPlainContact;
}
