import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ApplicationActionTypes, types, ApplicationState} from './types';
import {Application} from './';

const initialState: ApplicationState = {
  items: [],

  currentPage: 1,
  hasMore: false,
  showSuccessModal: false,
};

const slice = createSlice({
  name: 'Application',
  initialState,
  reducers: {
    saveItems: (
      state: ApplicationState,
      action: PayloadAction<Application.ResFetchItems>,
    ) => {
      if (action.payload.page === 1) {
        state.items = action.payload.orders;
      } else {
        state.items = [...state.items, ...action.payload.orders];
      }

      (state.currentPage = action.payload.page),
        (state.hasMore = action.payload.page < action.payload.pages);
    },

    removeItem: (state: ApplicationState, action: PayloadAction<number>) => {
      state.items = state.items.filter(({id}) => id !== action.payload);
    },

    toggleSuccessModal: (
      state: ApplicationState,
      action: PayloadAction<boolean>,
    ) => {
      state.showSuccessModal = action.payload;
    },
  },
});

export default slice.reducer;

export const applicationActions = {
  ...slice.actions,

  fetchItemsAsync: (
    payload: Application.ReqFetchItems,
  ): ApplicationActionTypes => ({
    type: types.FETCH_ITEMS,
    payload,
  }),
  createItemAsync: (
    payload: Application.ReqCreateItem,
  ): ApplicationActionTypes => ({
    type: types.CREATE_ITEM,
    payload,
  }),

  confirmItemAsync: (
    payload: Application.ReqConfirmItem,
  ): ApplicationActionTypes => ({
    type: types.CONFIRM_ITEM,
    payload,
  }),

  readItemAsync: (
    payload: Application.ReqReadItem,
  ): ApplicationActionTypes => ({
    type: types.READ_ITEM,
    payload,
  }),
};
