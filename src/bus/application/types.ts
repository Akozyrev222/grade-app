import {Application} from './namespace';

export enum types {
  FETCH_ITEMS = 'APPLICATION/FETCH_ITEMS',
  CREATE_ITEM = 'APPLICATION/CREATE_ITEM',

  CONFIRM_ITEM = 'APPLICATION/CONFIRM_ITEM',
  READ_ITEM = 'APPLICATION/READ_ITEM',
}

export type ApplicationState = {
  items: Application.Item[];

  currentPage: number;
  hasMore: boolean;
  showSuccessModal: boolean;
};

export type FetchItemsAsync = {
  type: typeof types.FETCH_ITEMS;
  payload: Application.ReqFetchItems;
};

export type CreateItemAsync = {
  type: typeof types.CREATE_ITEM;
  payload: Application.ReqCreateItem;
};

export type ConfirmItemAsync = {
  type: typeof types.CONFIRM_ITEM;
  payload: Application.ReqConfirmItem;
};

export type ReadItemAsync = {
  type: typeof types.READ_ITEM;
  payload: Application.ReqReadItem;
};

export type ApplicationActionTypes =
  | CreateItemAsync
  | FetchItemsAsync
  | ConfirmItemAsync
  | ReadItemAsync;
