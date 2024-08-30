import { ContactActivityType } from '../../entities/contactActivity.entity';
import { ICreateContactActivity } from '../../interfaces/contactActivity.interfaces';

export const newContactActivity: ICreateContactActivity = {
  personId: 1,
  activityType: ContactActivityType.Meeting,
  activityDate: '2024-08-30T15:00:00Z',
  description: 'Meeting to establish deadlines',
};

export const sameTypeContactActivities: ICreateContactActivity[] = [
  newContactActivity,
  {
    personId: 1,
    activityType: ContactActivityType.Meeting,
    activityDate: '2024-08-30T16:00:00Z',
    description: 'Meeting to start the project',
  },
];
