import {Role} from './namespace';

export enum types {
  FETCH_ITEM = 'ROLE/FETCH_ITEM',
  UPDATE_ITEM = 'ROLE/UPDATE_ITEM',

  END_FETCH_ITEM = 'ROLE/END_FETCH_ITEM',
  END_UPDATE_ITEM = 'ROLE/END_UPDATE_ITEM',
}

export type RoleState = {
  item: Role.Item | null | 'null';
};

//ASYNC

export type FetchItemAsync = {
  type: typeof types.FETCH_ITEM;
};

export type UpdateItemAsync = {
  type: typeof types.UPDATE_ITEM;
  payload: Role.Item | null;
};

export type RoleActionTypes = FetchItemAsync | UpdateItemAsync;
