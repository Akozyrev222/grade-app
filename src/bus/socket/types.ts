import {Role} from '../role';
import {Socket} from './namespace';

export enum types {
  REMOVE_ROOM = 'chat_destroyed',
  CREATE_MESSAGE = 'new_message',
  CREATE_ROOM = 'successfully_created_chat',
  CHANGE_ONLINE = 'changed_online',
  ERRORS = 'for_errors',

  PROCESS_ROOM = 'SOCKET/PROCESS_ROOM',
  PROCESS_MESSAGE = 'SOCKET/PROCESS_MESSAGE',
  PROCESS_ONLINE = 'SOCKET/PROCESS_ONLINE',
  PROCESS_REMOVE = 'SOCKET/PROCESS_REMOVE',
}

export type SocketState = {
  listenerItems: Socket.ListenerItem[];
  emitItems: Socket.EmitItem[];

  connected: boolean;
};

export type RemoveRoom = {
  type: typeof types.REMOVE_ROOM;
  chat_id: number;
};

export type CreateRoom = {
  type: typeof types.CREATE_ROOM;
  chats: Socket.ProcessRoomPayload;
  for_id: number;
  from_id: number;
};

export type CreateMessage = {
  type: typeof types.CREATE_MESSAGE;
  message: Socket.Message;
  recipient_id: number;
  tmp_id: number;
  for_role: Role.Item;
};

export type ChangeOnline = {
  type: typeof types.CHANGE_ONLINE;
  user_id: number;
  online: boolean | string;
};

export type ProcessMessage = {
  type: typeof types.PROCESS_MESSAGE;
  payload: Socket.ProcessMessagePayload;
};

export type ProcessRoom = {
  type: typeof types.PROCESS_ROOM;
  payload: Socket.ProcessRoomPayload;
};

export type ProcessOnline = {
  type: typeof types.PROCESS_ONLINE;
  payload: Socket.ProcessOnlinePayload;
};

export type ProcessRemove = {
  type: typeof types.PROCESS_REMOVE;
  payload: number;
};

export type Errors = {
  type: typeof types.ERRORS;
};

export type SocketActionTypes =
  | RemoveRoom
  | CreateMessage
  | CreateRoom
  | ChangeOnline
  | Errors;
