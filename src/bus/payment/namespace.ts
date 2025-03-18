export namespace Payment {
  export type Item = {
    transaction_receipt: string;
    product_identifier: string;
    platform: string;
  };

  export type VipStatus =
    | 'radius_10'
    | 'radius_20'
    | 'radius_30'
    | 'radius_100'
    | 'radius_unlimited'
    | 'month_12';

  export type ReqCreateTopItem = {
    days: number;
    payment: Item;
  };

  export type ReqCreateVipItem = {
    radius: VipStatus;

    payment: Item;
  };
}
