import { ContactActivityType } from '../entities/contactActivity.entity';
import { IQueryCondition } from '../interfaces/common.interfaces';
import {
  IGetContactActivityQuery,
  IGetContactActivityParams,
} from '../interfaces/contactActivity.interfaces';

type QueryConditionsFromActivity = {
  [K in keyof IGetContactActivityQuery]?: IQueryCondition<IGetContactActivityQuery[K]>;
};

type QueryConditionsFromParams = {
  [K in keyof IGetContactActivityParams]?: IQueryCondition<IGetContactActivityParams[K]>;
};

type SearchConditions = QueryConditionsFromActivity & QueryConditionsFromParams;
export const getSearchConditions = (personId: number, type: ContactActivityType | undefined) => {
  const searchConditions: SearchConditions = {
    personId: { condition: 'activity.personId = :personId', value: personId },
    ...(type && {
      type: { condition: 'activity.activityType = :type', value: type },
    }),
  };
  return searchConditions;
};
