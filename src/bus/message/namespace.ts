import {Asset} from 'react-native-image-picker';

export namespace Message {
  export type Item = {
    id: number;
    text: string;
    message_images: Image[];

    user_id: number;

    created_at: string;

    chat_id: number;
    not_read: number;
  };

  export type Image = {
    id: string | number;
    image: {
      url: string;
    };
  };

  export type FormCreate = {
    text: string;
    images?: Asset[];
  };

  export type ReqCreateItem = {
    message: FormCreate;
    chat_id: number;
    tmp_id?: number;
  };
  export type ResCreateItem = {
    message: Item;
  };

  export type ConfirmItemPayload = {
    id: number;
    item: Item;
  };

  export type ReqFetchItems = {
    id: number;
    last_message_id: number;
  };

  export type ResFetchItems = {
    messages: Item[];

    hasMore: boolean;
    pages: number;
  };
}
