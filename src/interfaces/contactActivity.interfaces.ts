import { Person } from '../entities';
import { ContactActivityType, ContactActivity } from '../entities/contactActivity.entity';

export interface ICreateContactActivity {
  personId: number;
  activityType: ContactActivityType;
  activityDate: string;
  description?: string;
}

export interface IGetContactActivityParams {
  personId: number;
}

export interface IGetContactActivityQuery {
  type: ContactActivityType;
}

export interface IGetContactActivityResult {
  contact: Person;
  contactActivities: ContactActivity[];
}
