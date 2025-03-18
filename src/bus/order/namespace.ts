import {Application} from '../application';
import {Currencies} from '../currencies';
import {Filter} from '../filter';
import {User} from '../user';

export namespace Order {
  export type Item = {
    title: string;
    address: string;
    contract_price: boolean;
    dead_line: DeadLineTypes;
    description: string;
    distance: Filter.Distance;
    id: number;
    latitude: number;
    longitude: number;
    price: string;
    speciality: Filter.Specialization;
    created_at: string;
    order_photos: Photo[];
    tags: Tag[];

    distance_to: number;

    review_left: any[];

    user: User;

    requests: Application.Request[];
    not_read_requests?: number;
    currency: Currencies.Item;
  };

  export type User = User.Item & {
    rating: number;
  };

  export type Photo = {
    id: number;
    photo: {
      url: string;
      small: {
        url: string;
      };
    };
    _destroy?: boolean;
  };

  export type DeadLineTypes = 'quickly' | 'slowly' | 'on_week';

  export type Image = {
    uri: string;
    type: string;
    name: string;
    _destroy?: boolean;
  };

  export type Specialization = {
    id: number;
    name: string;
  };

  export type OrderForm<I, T> = {
    title: string;
    description: string;
    price: string;
    dead_line: DeadLineTypes;
    order_photos_attributes: I[];
    contract_price: boolean;
    distance_id: Filter.Distance | null;
    latitude: number | null;
    longitude: number | null;
    address: string;
    tags_array: T[];
    speciality: number | null;
    currency_id?: number;
  };

  export type OrderCreateForm = OrderForm<Image, Tag>;

  export type OrderUpdateForm = OrderForm<Photo | Image, Tag>;

  export type Tag = {
    name: string;
    id: number;
    _destroy?: boolean;
    is_old?: boolean;
  };

  type OrderType = 'private' | 'public';

  export type FetchParams = {
    speciality_id?: number | null;
    tags?: string[];
    distance?: number | null;
  };

  export type FetchItemsParams = FetchParams & {
    page: number;
    per: number;
  };

  export type ReqFetchItems = {
    type: OrderType;
    params: FetchItemsParams;
  };

  export type ResFetchMyItems = {
    my_orders: Item[];
    pages: number;
  };

  export type PayloadSaveItems = {
    items: Item[];
    currentPage: number;
    hasMore: boolean;
  };

  export type ResFetchItems = {
    orders: Item[];
    pages: number;
  };

  export type ReqFetchDetail = {
    id: number;
  };

  export type ResFetchDetail = {
    order: Item;
  };

  export type ReqCreateItem = OrderCreateForm & {
    speciality_id: number;
  };

  export type ReqUpdateItem = OrderUpdateForm & {
    speciality_id: number;
    id: number;
  };

  export type ReqFetchDetailUser = {
    id: number;
  };

  export type ResFetchDetailUser = {
    user: User;
  };

  export type ResUpdateItem = {order: Item};

  export type ReqRemoveItem = {
    id: number;
  };
}
