import {Animated} from 'react-native';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  CreateMessage,
  ProcessMessage,
  ProcessOnline,
  ProcessRemove,
  ProcessRoom,
  SocketActionTypes,
  SocketState,
  types,
} from './types';
import {Socket} from './namespace';

const initialState: SocketState = {
  listenerItems: [],
  emitItems: [],

  connected: false,
};

const slice = createSlice({
  name: 'Socket',
  initialState,
  reducers: {
    toggleConnected: (state: SocketState, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },

    saveListenerItem: (
      state: SocketState,
      action: PayloadAction<Socket.ListenerItem>,
    ) => {
      const index = state.listenerItems.findIndex(
        ({event}) => event === action.payload.event,
      );

      if (index === -1) {
        state.listenerItems = [...state.listenerItems, action.payload];
      }
    },
    clearListenerItems: (state: SocketState) => {
      state.listenerItems = [];
    },

    saveEmitItem: (
      state: SocketState,
      action: PayloadAction<Socket.EmitItem>,
    ) => {
      state.emitItems = [...state.emitItems, action.payload];
    },
    removeEmitItems: (
      state: SocketState,
      action: PayloadAction<Socket.EmitEvent[]>,
    ) => {
      state.emitItems = state.emitItems.filter(
        ({event}) => !action.payload.includes(event),
      );
    },
    clearEmitItems: (state: SocketState) => {
      state.emitItems = [];
    },
  },
});

export default slice.reducer;

export const socketActions = {
  ...slice.actions,
  processMessage: (payload: Socket.ProcessMessagePayload): ProcessMessage => ({
    type: types.PROCESS_MESSAGE,
    payload,
  }),
  processRoom: (payload: Socket.ProcessRoomPayload): ProcessRoom => ({
    type: types.PROCESS_ROOM,
    payload,
  }),
  processOnline: (payload: Socket.ProcessOnlinePayload): ProcessOnline => ({
    type: types.PROCESS_ONLINE,
    payload,
  }),

  processRemove: (payload: number): ProcessRemove => ({
    type: types.PROCESS_REMOVE,
    payload,
  }),
};
