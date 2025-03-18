import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RoomActionTypes, RoomState, types} from './types';
import {Room} from './namespace';
import {Message} from '../message';
import {goBack} from '@/navigation';
import {Platform} from 'react-native';
import {act} from 'react-test-renderer';

const initialState: RoomState = {
  items: [],
  detail: null,

  notReadCount: 0,
};

const slice = createSlice({
  name: 'Room',
  initialState,
  reducers: {
    saveItems: (
      state: RoomState,
      action: PayloadAction<Room.ResFetchItems>,
    ) => {
      state.items = action.payload.chats;
    },

    saveItem: (state: RoomState, action: PayloadAction<Room.Item[]>) => {
      state.items = [...action.payload, ...state.items];
    },

    removeItem: (state: RoomState, action: PayloadAction<number>) => {
      const item = state.items.find(({id}) => id === action.payload);

      state.items = state.items.filter(({id}) => id !== action.payload);

      if (item) {
        if (item.id === state.detail?.id) {
          state.detail = null;
        }

        state.notReadCount -= item.not_read_count;
      }
    },

    saveDetail: (state: RoomState, action: PayloadAction<Room.Item>) => {
      state.detail = action.payload;
    },
    clearDetail: (state: RoomState) => {
      state.detail = null;
    },

    readAllMessages: (
      state: RoomState,
      action: PayloadAction<Room.ReadAll>,
    ) => {
      const index = state.items.findIndex(({id}) => id === action.payload.id);
      // const item: Room.Item = {
      //   ...state.items[index],
      //   ...state.,
      //   not_read_count: 0,
      // };
    },

    updateLastMessage: (
      state: RoomState,
      action: PayloadAction<Room.UpdateLastMessagePayload>,
    ) => {
      const index = state.items.findIndex(({id}) => id === action.payload.id);
      const isRead =
        !state.detail || state.detail.id !== action.payload.message.chat_id;

      if (index !== -1) {
        const prev = state.items[index];

        const item: Room.Item = {
          ...state.items[index],
          last_message: action.payload.message,
          not_read_count: prev.not_read_count + +isRead,
        };
        state.items = [item, ...state.items.filter((_, i) => i !== index)];
      }
      state.notReadCount += +isRead;
    },

    saveNotReadCount: (state: RoomState, action: PayloadAction<number>) => {
      state.notReadCount = action.payload;
    },
    updateNotRead: (
      state: RoomState,
      action: PayloadAction<Room.UpdateNotReadPayload>,
    ) => {
      const index = state.items.findIndex(({id}) => id === action.payload.id);

      if (index !== -1) {
        const notRead = state.items[index].not_read_count;

        if (notRead) {
          state.items[index].not_read_count -=
            notRead - action.payload.count < 0 ? 0 : action.payload.count;
        }

        if (state?.detail?.id === action.payload.id) {
          const res = state.notReadCount - action.payload.count;

          state.notReadCount = res > 0 ? res : 0;
        }
      }
    },
    updateOnline: (
      state: RoomState,
      action: PayloadAction<boolean | string>,
    ) => {
      if (state.detail) {
        state.detail.user.online = action.payload;
      }
    },
  },
});

export default slice.reducer;

export const roomActions = {
  ...slice.actions,

  fetchItemsAsync: (payload: Room.ReqFetchItems): RoomActionTypes => ({
    type: types.FETCH_ITEMS,
    payload,
  }),
  fetchDetailAsync: (payload: Room.ReqFetchDetail): RoomActionTypes => ({
    type: types.FETCH_DETAIL,
    payload,
  }),
  removeItemAsync: (payload: Room.ReqRemoveItem): RoomActionTypes => ({
    type: types.REMOVE_ITEM,
    payload,
  }),
  createItemAsync: (payload: Room.ReqCreateItem): RoomActionTypes => ({
    type: types.CREATE_ITEM,
    payload,
  }),
};
