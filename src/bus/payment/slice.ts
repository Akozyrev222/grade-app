import {createSlice} from '@reduxjs/toolkit';
import {Payment} from './namespace';
import {PaymentActionTypes, PaymentState, types} from './types';

const initialState: PaymentState = {
  items: [],
};

const slice = createSlice({
  initialState,
  name: 'Payment',
  reducers: {},
});

export default slice.reducer;

export const paymentActions = {
  ...slice.actions,
  createTopItem: (payload: Payment.ReqCreateTopItem): PaymentActionTypes => ({
    type: types.CREATE_TOP_ITEM,
    payload,
  }),
  createVipItem: (payload: Payment.ReqCreateVipItem): PaymentActionTypes => ({
    type: types.CREATE_VIP_ITEM,
    payload,
  }),
};
