import {Order} from './namespace';

export enum types {
  FETCH_ITEMS = 'ORDER/FETCH_ITEMS',
  FETCH_DETAIL = 'ORDER/FETCH_DETAIL',
  UPDATE_ITEM = 'ORDER/UPDATE_ITEM',
  CREATE_ITEM = 'ORDER/CREATE_ITEM',

  REMOVE_ITEM = 'ORDER/REMOVE_ITEM',

  FETCH_DETAIL_USER = 'ORDER/FETCH_DETAIL_USER',

  END_FETCH_DETAIL = 'ORDER/END_FETCH_DETAIL',
  END_FETCH_ITEMS = 'ORDER/END_FETCH_ITEMS',
}

export type OrderState = {
  items: Order.Item[];
  detail: Order.Item | null;

  detail_user: Order.User | null;

  specializatoion: Order.Specialization | null;

  currentPage: number;
  hasMore: boolean;
};

export type FetchItemsAsync = {
  type: typeof types.FETCH_ITEMS;
  payload: Order.ReqFetchItems;
};

export type FetchDetailAsync = {
  type: typeof types.FETCH_DETAIL;
  payload: Order.ReqFetchDetail;
};

export type CreateItemAsync = {
  type: typeof types.CREATE_ITEM;
  payload: Order.ReqCreateItem;
};

export type UpdateItemAsync = {
  type: typeof types.UPDATE_ITEM;
  payload: Order.ReqUpdateItem;
};

export type FetchDetailUserAsync = {
  type: typeof types.FETCH_DETAIL_USER;
  payload: Order.ReqFetchDetailUser;
};

export type RemoveItemAsync = {
  type: typeof types.REMOVE_ITEM;
  payload: Order.ReqRemoveItem;
};

export type OrderActionTypes =
  | UpdateItemAsync
  | CreateItemAsync
  | FetchDetailAsync
  | FetchItemsAsync
  | FetchDetailUserAsync
  | RemoveItemAsync;
