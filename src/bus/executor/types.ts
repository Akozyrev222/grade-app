import {Executor} from './namespace';

export enum types {
  FETCH_ITEMS = 'EXECUTOR/FETCH_ITEMS',
  FETCH_DETAIL = 'EXECUTOR/FETCH_DETAIL',
}

export type ExecutorState = {
  items: Executor.Item[];
  detail: Executor.Item | null;

  currentPage: number;
  hasMore: boolean;
};

export type FetchItemsAsync = {
  type: typeof types.FETCH_ITEMS;
  payload: Executor.ReqFetchItems;
};

export type FetchDetailAsync = {
  type: typeof types.FETCH_DETAIL;
  payload: Executor.ReqFetchDetail;
};

export type ExecutorActionTypes = FetchItemsAsync | FetchDetailAsync;
