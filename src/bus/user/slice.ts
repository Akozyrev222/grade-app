import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '.';

import {UserActionTypes, UserState, types} from './types';

const initialState: UserState = {
  detail: null,
  specialization: null,
  device_token: null,
  promoCodeSuccess: false,
  loading: false,
};

const slice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    saveDetail: (state: UserState, action: PayloadAction<User.Item>) => {
      state.detail = action.payload;
    },
    saveDeviceToken: (state: UserState, action: PayloadAction<string>) => {
      state.device_token = action.payload;
    },
    saveSpecialization: (
      state: UserState,
      action: PayloadAction<User.Speciality[]>,
    ) => {
      state.specialization = action.payload;
    },
    clearSpecialization: (state: UserState) => {
      state.specialization = null;
    },
    clearDetail: (state: UserState) => {
      state.detail = null;
    },
    addChatId: (state: UserState, action: PayloadAction<number[]>) => {
      state.detail.chat_ids = [
        ...state.detail.chat_ids.filter((id) => !action.payload.includes(id)),
        ...action.payload,
      ];
    },
    removeChatId: (state: UserState, action: PayloadAction<number>) => {
      const item = state.detail?.chat_ids?.find((id) => id === action.payload);
      if (item) {
        state.detail.chat_ids = state.detail.chat_ids.filter(
          (id) => id !== action.payload,
        );
      }
    },
    promoCodeSuccess: (state: UserState) => {
      state.promoCodeSuccess = true;
    },
    promoCodeSuccessRemove: (state: UserState) => {
      state.promoCodeSuccess = false;
    },
    addLoading: (state: UserState) => {
      state.loading = true;
    },
    removeLoading: (state: UserState) => {
      state.loading = false;
    },
  },
});

export default slice.reducer;

export const userActions = {
  ...slice.actions,
  fetchDetailAsync: (): UserActionTypes => ({
    type: types.FETCH_DETAIL,
  }),
  updateDetailAsync: (payload: User.ReqUpdateDetail): UserActionTypes => ({
    type: types.UPDATE_DETAIL,
    payload,
  }),
  updateDeviceTokenAsync: (
    payload: User.ReqUpdateDeviceToken,
  ): UserActionTypes => ({
    type: types.UPDATE_DEVICE_TOKEN,
    payload,
  }),
  confirmPhoneAsync: (payload: User.ReqConfirmPhone): UserActionTypes => ({
    type: types.CONFIRM_PHONE,
    payload,
  }),
  verificateAsync: (payload: User.ReqVerificate): UserActionTypes => ({
    type: types.VERIFICATE,
    payload,
  }),
  removeDetailAsync: (): UserActionTypes => ({
    type: types.REMOVE_DETAIL,
  }),
  createExecutorAsync: (payload: User.ReqCreateExecutor): UserActionTypes => ({
    type: types.CREATE_EXECUTOR,
    payload,
  }),
  sendPromoCodeAsync: (payload: User.PromoCode): UserActionTypes => ({
    type: types.SEND_PROMOCODE,
    payload,
  }),
};
