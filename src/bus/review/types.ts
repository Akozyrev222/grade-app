import {Review} from './namespace';

export enum types {
  CREATE_ITEM = 'REVIEW/CREATE_ITEM',
}

export type ReviewState = {
  items: Review.Item[];
};

export type CreateItemAsync = {
  type: typeof types.CREATE_ITEM;
  payload: Review.ReqCreateItem;
};

export type ReviewActionTypes = CreateItemAsync;
