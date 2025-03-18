import {Auth} from './namespace';

export enum types {
  FETCH_TOKEN = 'AUTH/FETCH_TOKEN',
  SIGN_UP = 'AUTH/SIGN_UP',
  SEND_CODE = 'AUTH/SEND_CODE',
  CONFIRM_CODE = 'AUTH/CONFIRM_CODE',
  LOGOUT = 'AUTH/LOGOUT',
  UPDATE_TOKEN = 'AUTH/UPDATE_TOKEN',
  SOCIAL_NETWORKS_LOGIN = 'AUTH/SOCIAL_NETWORKS_LOGIN',
  END_FETCH_TOKEN = 'AUTH/END_FETCH_TOKEN',
  END_UPDATE_TOKEN = 'AUTH/END_UPDATE_TOKEN',
}

export type AuthState = {
  token: string | null;
  register_token: string | null;
  phone: {
    code: string;
    value: string;
  } | null;
  appleEmail: string | null;
  appleFullName: string | null;
};

//ASYNC

export type FetchTokenAsync = {
  type: typeof types.FETCH_TOKEN;
};

export type SignUpAsync = {
  type: typeof types.SIGN_UP;
  payload: Auth.ReqSignUp;
};

export type LogoutAsync = {
  type: typeof types.LOGOUT;
};

export type SendCodeAsync = {
  type: typeof types.SEND_CODE;
  payload: Auth.ReqSendCode;
};

export type ConfirmCodeAsync = {
  type: typeof types.CONFIRM_CODE;
  payload: Auth.ReqConfirmCode;
};

export type UpdateTokenAsync = {
  type: typeof types.UPDATE_TOKEN;
  payload: string;
};

export type GoogleLoginAsync = {
  type: typeof types.SOCIAL_NETWORKS_LOGIN;
  payload: Auth.ReqSocialNetworksLogin;
};

export type AuthActionTypes =
  | SignUpAsync
  | FetchTokenAsync
  | LogoutAsync
  | SendCodeAsync
  | ConfirmCodeAsync
  | UpdateTokenAsync
  | GoogleLoginAsync;
