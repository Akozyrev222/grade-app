import {User} from '.';

export enum types {
  FETCH_DETAIL = 'USER/FETCH_DETAIL',
  VERIFICATE = 'USER/VERIFICATE',
  UPDATE_DETAIL = 'USER/UPDATE_DETAIL',

  CREATE_EXECUTOR = 'CREATE_EXECUTOR',

  UPDATE_DEVICE_TOKEN = 'USER/UPDATE_DEVICE_TOKEN',

  CONFIRM_PHONE = 'USER/CONFIRM_PHONE',

  REMOVE_DETAIL = 'USER/REMOVE_DETAIL',

  END_FETCH_DETAIL = 'USER/END_FETCH_DETAIL',
  SEND_PROMOCODE = 'USER/SEND_PROMOCODE',
}

export type UserState = {
  detail: User.Item | null;

  specialization: User.Speciality[] | [];
  device_token: string | null;
  promoCodeSuccess: boolean;
  loading: boolean;
};

//ASYNC

export type FetchDetailAsync = {
  type: typeof types.FETCH_DETAIL;
};

export type VerificateAsync = {
  type: typeof types.VERIFICATE;
  payload: User.ReqVerificate;
};

export type UpdateDetailAsync = {
  type: typeof types.UPDATE_DETAIL;
  payload: User.ReqUpdateDetail;
};

export type ConfirmPhoneAsync = {
  type: typeof types.CONFIRM_PHONE;
  payload: User.ReqConfirmPhone;
};

export type UpdateDeviceTokenAsync = {
  type: typeof types.UPDATE_DEVICE_TOKEN;
  payload: User.ReqUpdateDeviceToken;
};

export type RemoveDetailAsync = {
  type: typeof types.REMOVE_DETAIL;
};

export type CreateExecutorAsync = {
  type: typeof types.CREATE_EXECUTOR;
  payload: User.ReqCreateExecutor;
};

export type SendPromoCode = {
  type: typeof types.SEND_PROMOCODE;
  payload: User.PromoCode;
};

export type UserActionTypes =
  | FetchDetailAsync
  | VerificateAsync
  | UpdateDetailAsync
  | ConfirmPhoneAsync
  | UpdateDeviceTokenAsync
  | RemoveDetailAsync
  | CreateExecutorAsync
  | SendPromoCode;
