import {Message} from '../message';
import {User} from '../user';

export namespace Room {
  export type Item = {
    id: number;
    not_read_count: number;

    last_message: Message.Item | null;

    user: User.Item;

    created_at: string;
  };

  export type ReqFetchItems = {};
  export type ResFetchItems = {
    chats: Item[];
  };

  export type ReqFetchDetail = {
    id: number;
  };
  export type ResFetchDetail = {
    chat: Item & {
      messages: Message.Item[];
    };
  };

  export type ReqRemoveItem = {
    id: number;
  };
  export type ResRemoveItem = {};

  export type ReqCreateItem = {
    executor_id?: number;
    customer_id?: number;
  };
  export type ResCreateItem = {chat: Item};

  export type UpdateLastMessagePayload = {
    id: number;
    message: Message.Item;
  };

  export type UpdateNotReadPayload = {
    id: number;
    count: number;
  };
  export type ReadAll = {
    id: number;
    not_read_count: number;
  };
}
