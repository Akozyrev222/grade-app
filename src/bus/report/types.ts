import {Report} from './namespace';

export enum types {
  CREATE_ITEM = 'REPORT/CREATE_ITEM',
}

export type ReportState = {
  items: Report.Item;
};

export type CreateItemAsync = {
  type: typeof types.CREATE_ITEM;
  payload: Report.ReqCreateItem;
};

export type ReportActionTypes = CreateItemAsync;
