export interface INumericId {
  id: number;
}

export interface IQueryCondition<T = any> {
  condition: string;
  value: T;
}
