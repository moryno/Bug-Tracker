import { IPagination } from "interfaces";

export class PaginationResult<T> {
  data: T;
  pagination: IPagination;

  constructor(data: T, pagination: IPagination) {
    this.data = data;
    this.pagination = pagination;
  }
}

export class PagingParams {
  pageNumber;
  pageSize;

  constructor(pageNumber = 1, pageSize = 10) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}
