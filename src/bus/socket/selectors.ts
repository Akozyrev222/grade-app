import {RootState} from '@/store/rootReducer';

export const getEmitItems = (state: RootState) => state.socket.emitItems;
export const getListenerItems = (state: RootState) =>
  state.socket.listenerItems;

export const getConnected = (state: RootState) => state.socket.connected;
