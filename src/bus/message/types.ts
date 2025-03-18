import {Message} from './namespace';

export enum types {
  FETCH_ITEMS = 'MESSAGES/FETCH_ITEMS',

  CREATE_ITEM = 'MESSAGE/CREATE_ITEM',
  READ_ITEMS = 'MESSAGES/READ_ITEMS',

  CONFIRM_ITEM = 'MESSAGES/CONFIRM_ITEM',
}

export type MessageState = {
  items: Message.Item[];

  hasMore: boolean;
};

export type CreateItemAsync = {
  type: typeof types.CREATE_ITEM;
  payload: Message.ReqCreateItem;
};

export type ReadItemsAsync = {
  type: typeof types.READ_ITEMS;
  payload: number[];
};

export type FetchItemsAsync = {
  type: typeof types.FETCH_ITEMS;
  payload: Message.ReqFetchItems;
};

export type MessageActionTypes =
  | CreateItemAsync
  | ReadItemsAsync
  | FetchItemsAsync;
