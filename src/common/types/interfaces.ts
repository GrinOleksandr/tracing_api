export interface IPagination<T> {
  limit: number;
  skip: number;
  total: number;

  data: T[];
}
