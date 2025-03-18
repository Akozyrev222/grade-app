import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Socket} from '../socket';
import {Executor} from './namespace';

import {ExecutorActionTypes, ExecutorState, types} from './types';

const initialState: ExecutorState = {
  items: [],
  detail: null,

  currentPage: 1,
  hasMore: false,
};

const slice = createSlice({
  name: 'Executor',
  initialState,
  reducers: {
    saveItems: (
      state: ExecutorState,
      action: PayloadAction<Executor.PayloadSaveItems>,
    ) => {
      if (action.payload.currentPage === 1) {
        state.items = action.payload.items;
      } else {
        const ids = new Set(state.items.map((d) => d.id));
        state.items = [
          ...state.items,
          ...action.payload.items.filter((d) => !ids.has(d.id)).sort((a, b) => {
            if (a.top && !b.top) {
              return -1;
            }
            if (!a.top && b.top) {
              return 1;
            }
            return 0;
          }),
        ];
      }

      state.hasMore = action.payload.hasMore;
      state.currentPage = action.payload.currentPage;
    },

    clearItems: (state: ExecutorState) => {
      state.items = [];
      state.currentPage = 1;
      state.hasMore = false;
    },
    saveDetail: (
      state: ExecutorState,
      action: PayloadAction<Executor.ResFetchDetail>,
    ) => {
      state.detail = action.payload.user;
    },

    clearDetail: (state: ExecutorState) => {
      state.detail = null;
    },

    toggleFavorite: (state: ExecutorState, action: PayloadAction<boolean>) => {
      if (state.detail) {
        state.detail.favorite = action.payload;
      }
    },

    updateOnline: (
      state: ExecutorState,
      action: PayloadAction<Socket.ProcessOnlinePayload>,
    ) => {
      if (state.detail && state.detail.id === action.payload.id) {
        state.detail.online = action.payload.online;
      }
    },
  },
});

export default slice.reducer;

export const executorActions = {
  ...slice.actions,

  fetchItemsAsync: (payload: Executor.ReqFetchItems): ExecutorActionTypes => ({
    type: types.FETCH_ITEMS,
    payload,
  }),

  fetchDetailAsync: (
    payload: Executor.ReqFetchDetail,
  ): ExecutorActionTypes => ({
    type: types.FETCH_DETAIL,
    payload,
  }),
};
