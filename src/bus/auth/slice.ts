import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Auth} from './namespace';

import {AuthActionTypes, AuthState, types} from './types';

const initialState: AuthState = {
  token: null,
  register_token: null,
  phone: null,
  appleEmail: null,
  appleFullName: null,
};

const slice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAppleCredentials: (
      state: AuthState,
      action: PayloadAction<Auth.AppleCredentials>,
    ) => {
      state.appleEmail = action.payload.email;
      state.appleFullName = action.payload.fullName;
    },

    saveToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    clearToken: (state: AuthState) => {
      state.token = null;
    },
    saveRegisterToken: (state: AuthState, action: PayloadAction<string>) => {
      state.register_token = action.payload;
    },
    clearRegisterToken: (state: AuthState) => {
      state.register_token = null;
    },
    savePhone: (state: AuthState, action: PayloadAction<Auth.Phone>) => {
      state.phone = action.payload;
    },
    clearPhone: (state: AuthState) => {
      state.phone = null;
    },
  },
});

export default slice.reducer;

export const authActions = {
  ...slice.actions,
  //ASYNC
  fetchTokenAsync: (): AuthActionTypes => ({
    type: types.FETCH_TOKEN,
  }),
  updateTokenAsync: (payload: string): AuthActionTypes => ({
    type: types.UPDATE_TOKEN,
    payload,
  }),
  signUpAsync: (payload: Auth.ReqSignUp): AuthActionTypes => ({
    type: types.SIGN_UP,
    payload,
  }),
  sendCodeAsync: (payload: Auth.ReqSendCode): AuthActionTypes => ({
    type: types.SEND_CODE,
    payload,
  }),
  confirmCodeAsync: (payload: Auth.ReqConfirmCode): AuthActionTypes => ({
    type: types.CONFIRM_CODE,
    payload,
  }),
  logoutAsync: (): AuthActionTypes => ({
    type: types.LOGOUT,
  }),
  socialNetworksAsync: (
    payload: Auth.ReqSocialNetworksLogin,
  ): AuthActionTypes => ({
    type: types.SOCIAL_NETWORKS_LOGIN,
    payload,
  }),
};
