import {Payment} from './namespace';

export enum types {
  CREATE_TOP_ITEM = 'PAYMENT/CREATE_TOP_ITEM',
  CREATE_VIP_ITEM = 'PAYMENT/CREATE_VIP_ITEM',
}

export type PaymentState = {
  items: Payment.Item[];
};

export type CreateTopItemAsync = {
  type: typeof types.CREATE_TOP_ITEM;
  payload: Payment.ReqCreateTopItem;
};

export type CreateVipItemAsync = {
  type: typeof types.CREATE_VIP_ITEM;
  payload: Payment.ReqCreateVipItem;
};

export type PaymentActionTypes = CreateTopItemAsync | CreateVipItemAsync;
