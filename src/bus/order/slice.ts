import {Socket} from '@/bus/socket';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {OrderActionTypes, types, OrderState} from './types';
import {Order} from './';

const initialState: OrderState = {
  items: [],
  detail: null,

  specializatoion: null,

  detail_user: null,

  currentPage: 1,
  hasMore: false,
};

const slice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    saveItems: (
      state: OrderState,
      action: PayloadAction<Order.PayloadSaveItems>,
    ) => {
      if (action.payload.currentPage === 1) {
        state.items = action.payload.items;
      } else {
        state.items = [...state.items, ...action.payload.items];
      }

      state.currentPage = action.payload.currentPage;
      state.hasMore = action.payload.hasMore;
    },

    clearItems: (state: OrderState) => {
      state.items = [];
    },

    saveDetail: (
      state: OrderState,
      action: PayloadAction<Order.ResFetchDetail>,
    ) => {
      state.detail = action.payload.order;
    },

    clearDetail: (state: OrderState) => {
      state.detail = null;
    },

    saveDetailUser: (
      state: OrderState,
      action: PayloadAction<Order.ResFetchDetailUser>,
    ) => {
      state.detail_user = action.payload.user;
    },

    clearDetailUser: (state: OrderState) => {
      state.detail_user = null;
    },

    updateItem: (
      state: OrderState,
      action: PayloadAction<Order.ResUpdateItem>,
    ) => {
      const index = state.items.findIndex(
        ({id}) => id === action.payload.order.id,
      );

      if (index !== -1) {
        state.items[index] = action.payload.order;
      }
    },

    saveSpecialization: (
      state: OrderState,
      action: PayloadAction<Order.Specialization>,
    ) => {
      state.specializatoion = action.payload;
    },
    clearSpecialization: (state: OrderState) => {
      state.specializatoion = null;
    },

    removeItem: (
      state: OrderState,
      action: PayloadAction<Order.ReqRemoveItem>,
    ) => {
      state.items = state.items.filter(({id}) => id !== action.payload.id);
    },

    updateOnline: (
      state: OrderState,
      action: PayloadAction<Socket.ProcessOnlinePayload>,
    ) => {
      if (state.detail_user && state.detail_user.id === action.payload.id) {
        state.detail_user.online = action.payload.online;
      }
    },

    updateReview: (state: OrderState, action: PayloadAction<number>) => {
      if (state.detail?.id === action.payload) {
        state.detail.review_left = [action.payload];
      }
    },
  },
});

export default slice.reducer;

export const orderActions = {
  ...slice.actions,
  fetchItemsAsync: (payload: Order.ReqFetchItems): OrderActionTypes => ({
    type: types.FETCH_ITEMS,
    payload,
  }),
  fetchDetailUserAsync: (
    payload: Order.ReqFetchDetailUser,
  ): OrderActionTypes => ({
    type: types.FETCH_DETAIL_USER,
    payload,
  }),
  fetchDetailAsync: (payload: Order.ReqFetchDetail): OrderActionTypes => ({
    type: types.FETCH_DETAIL,
    payload,
  }),
  createItemAsync: (payload: Order.ReqCreateItem): OrderActionTypes => ({
    type: types.CREATE_ITEM,
    payload,
  }),
  updateItemAsync: (payload: Order.ReqUpdateItem): OrderActionTypes => ({
    type: types.UPDATE_ITEM,
    payload,
  }),
  removeItemAsync: (payload: Order.ReqRemoveItem): OrderActionTypes => ({
    type: types.REMOVE_ITEM,
    payload,
  }),
};
