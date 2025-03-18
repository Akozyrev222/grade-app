import {Link} from './namespace';

export enum types {
  FETCH_ITEM = 'LINK/FETCH_ITEM',
  UPDATE_ITEM = 'LINK/UPDATE_ITEM',

  END_FETCH_ITEM = 'LINK/END_FETCH_ITEM',
  END_UPDATE_ITEM = 'LINK/END_UPDATE_ITEM',
}

export type LinkState = {
  item: Link.Item;
};

//ASYNC

export type FetchItemAsync = {
  type: typeof types.FETCH_ITEM;
};

export type UpdateItemAsync = {
  type: typeof types.UPDATE_ITEM;
  payload: Link.Item;
};

export type LinkActionTypes = FetchItemAsync | UpdateItemAsync;
