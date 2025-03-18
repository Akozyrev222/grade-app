import {Category} from './namespace';

export enum types {
  FETCH_ITEMS = 'CATEGORY/FETCH_ITEMS',
}

export type CategoryState = {
  items: Category.Item[];
  detail: Category.Item | null;
  name: string;
};

export type FetchItemsAsync = {
  type: typeof types.FETCH_ITEMS;
  payload: Category.ReqFetchItems;
};

export type CategoryActionTypes = FetchItemsAsync;
