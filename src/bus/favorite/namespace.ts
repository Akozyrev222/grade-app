import {Executor} from '../executor';

export namespace Favorite {
  export type Item = Executor.Item;

  export type ReqFetchItems = {
    by_distance: boolean;
    search: string;
    latitude?: number;
    longitude?: number;
  };
  export type ResFetchItems = {
    favorite_users: Item[];
  };

  export type ReqCreateItem = {
    id: number;
  };
  export type ResCreateItem = {
    success: boolean;
  };

  export type ReqRemoveItem = {
    id: number;
  };
  export type ResRemoveItem = {
    success: boolean;
  };
}
