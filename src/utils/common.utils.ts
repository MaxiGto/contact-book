import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { IQueryCondition } from '../interfaces/common.interfaces';

export const loadQuery = <T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  searchConditions: Record<string, IQueryCondition>,
): SelectQueryBuilder<T> => {
  Object.entries(searchConditions).forEach(([key, { condition, value }]) => {
    query.andWhere(condition, { [key]: value });
  });
  return query;
};
