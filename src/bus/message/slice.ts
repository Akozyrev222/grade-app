import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {MessageActionTypes, MessageState, types} from './types';
import {Message} from './namespace';
import {Platform} from 'react-native';

const initialState: MessageState = {
  items: [],

  hasMore: false,
};

const slice = createSlice({
  name: 'Message',
  initialState,
  reducers: {
    saveNewItems: (
      state: MessageState,
      action: PayloadAction<Message.ResFetchItems>,
    ) => {
      state.items = [...state.items, ...action.payload.messages];
      state.hasMore = action.payload.hasMore;
    },
    saveItems: (state: MessageState, action: PayloadAction<Message.Item[]>) => {
      state.items = action.payload;

      if (action.payload.length === 20) {
        state.hasMore = true;
      }
    },
    clearItems: (state: MessageState) => {
      state.items = [];
    },
    saveItem: (state: MessageState, action: PayloadAction<Message.Item>) => {
      state.items = [action.payload, ...state.items];
    },
    confirmItem: (
      state: MessageState,
      action: PayloadAction<Message.ConfirmItemPayload>,
    ) => {
      const index = state.items.findIndex(({id}) => id === action.payload.id);

      if (index !== -1) {
        state.items[index] = action.payload.item;
      } else {
        state.items = [action.payload.item, ...state.items];
      }
    },

    createItem: (state: MessageState, action: PayloadAction<Message.Item>) => {
      state.items = [action.payload, ...state.items];
    },

    readItems: (state: MessageState, action: PayloadAction<number[]>) => {
      state.items = state.items.map((item) =>
        !action.payload.includes(item.id) ? item : {...item, not_read: 0},
      );
    },
  },
});

export default slice.reducer;

export const messageActions = {
  ...slice.actions,

  fetchItemsAsync: (payload: Message.ReqFetchItems) => ({
    type: types.FETCH_ITEMS,
    payload,
  }),
  createItemAsync: (payload: Message.ReqCreateItem): MessageActionTypes => ({
    type: types.CREATE_ITEM,
    payload,
  }),
  readItemsAsync: (payload: number[]): MessageActionTypes => ({
    type: types.READ_ITEMS,
    payload,
  }),
};
