import {Room} from './namespace';

export enum types {
  FETCH_ITEMS = 'ROOM/FETCH_ITEMS',
  FETCH_DETAIL = 'ROOM/FETCH_DETAIL',

  CREATE_ITEM = 'ROOM/CREATE_ITEM',

  REMOVE_ITEM = 'ROOM/REMOVE_ITEM',

  END_FETCH_DETAIL = 'ROOM/END_FETCH_DETAIL',
}

export type RoomState = {
  items: Room.Item[];

  detail: Room.Item | null;

  notReadCount: number;
};

export type FetchItemsAsync = {
  type: typeof types.FETCH_ITEMS;
  payload: Room.ReqFetchItems;
};

export type FetchDetailAsync = {
  type: typeof types.FETCH_DETAIL;
  payload: Room.ReqFetchDetail;
};

export type RemoveItemAsync = {
  type: typeof types.REMOVE_ITEM;
  payload: Room.ReqRemoveItem;
};

export type CreateItemAsync = {
  type: typeof types.CREATE_ITEM;
  payload: Room.ReqCreateItem;
};

export type RoomActionTypes =
  | FetchDetailAsync
  | FetchItemsAsync
  | RemoveItemAsync
  | CreateItemAsync;
