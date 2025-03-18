import {Favorite} from './namespace';

export enum types {
  FETCH_ITEMS = 'FAVORITE/FETCH_ITEMS',

  CREATE_ITEM = 'FAVORITE/CREATE_ITEM',
  REMOVE_ITEM = 'FAVORITE/REMOVE_ITEM',
}

export type FavoriteState = {
  items: Favorite.Item[];
};

export type FetchItemsAsync = {
  type: typeof types.FETCH_ITEMS;
  payload: Favorite.ReqFetchItems;
};

export type CreateItemAsync = {
  type: typeof types.CREATE_ITEM;
  payload: Favorite.ReqCreateItem;
};

export type RemoveItemAsync = {
  type: typeof types.REMOVE_ITEM;
  payload: Favorite.ReqRemoveItem;
};

export type FavoriteActionTypes =
  | FetchItemsAsync
  | CreateItemAsync
  | RemoveItemAsync;
