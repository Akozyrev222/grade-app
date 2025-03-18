import {Asset} from 'react-native-image-picker';
import {Currencies} from '../currencies';
import {Order} from '../order';
import {User} from '../user';

export namespace Application {
  export type User = User.Item & {
    distance: number;
  };

  export type Request = {
    id: number;
    description: string;
    price: number;
    created_at: string;
    user: User;
    is_read: boolean;
    currency: Currencies.Item;
  };

  export type Item = Order.Item & {
    requests: Request[];
  };

  export type Form = {
    price: string;
    description: string;
    photo_attributes: Asset[];
    currency_id: number;
  };

  export type ReqCreateItem = Form & {
    order_id: number;
  };
  export type ResCreateItem = {};

  export type ReqFetchItems = {
    page: number;
    per: number;
  };
  export type ResFetchItems = {
    orders: Item[];
    pages: number;
    page: number;
  };

  export type ReqConfirmItem = {
    id: number;
  };

  export type ResConfirmItem = {
    order_id: number;
  };

  export type ReqReadItem = {
    ids: number;
  };

  export type ResReadItem = {
    success: boolean;
  };
}
