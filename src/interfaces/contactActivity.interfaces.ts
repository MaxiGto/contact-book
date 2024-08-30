import { ContactActivityType } from '../entities/contactActivity.entity';

export interface ICreateContactActivity {
  personId: number;
  activityType: ContactActivityType;
  activityDate: string;
  description?: string;
}
