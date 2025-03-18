import {User} from '../user';

export namespace Executor {
  export type Item = User.Item & {
    id: number;
    rating: number;
    distance_to: number;

    top: boolean;
  };

  export type FetchItemsParams = {
    speciality_id?: number | null;
    tags?: string[];
    distance_id?: number | null;
    search?: string | null;

    latitude?: number;
    longitude?: number;
  };

  export type ReqFetchItems = FetchItemsParams & {
    page: number;
    per: number;
  };

  export type ResFetchItems = {
    executors: Item[];
    tops: Item[];
    tops_pages: number;
    executors_pages: number;
  };

  export type PayloadSaveItems = {
    currentPage: number;
    hasMore: boolean;
    items: Item[];
  };

  export type ReqFetchDetail = {
    id: number;
  };

  export type ResFetchDetail = {
    user: Item;
  };
}
