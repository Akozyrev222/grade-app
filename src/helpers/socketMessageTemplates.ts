import {Role} from '@/bus/role';

export const generateSubscribeRoom = (id: number) =>
  JSON.stringify({
    identifier: JSON.stringify({channel: 'RoomChannel', chat_id: id}),
    command: 'subscribe',
    message: JSON.stringify({name: `chat_channel_${id}`}),
  });

export const generateSubscribeGeneral = () =>
  JSON.stringify({
    identifier: JSON.stringify({channel: 'RoomChannel'}),
    command: 'subscribe',
    message: JSON.stringify({name: `chats_channel`}),
  });

export const generateMessage = <D>(id: number, data: D & {role: Role.Item}) =>
  JSON.stringify({
    identifier: JSON.stringify({channel: 'RoomChannel', chat_id: id}),
    command: 'message',
    data: JSON.stringify(data),
  });

export const generateGeneralMessage = <D>(data: D & {role: Role.Item}) =>
  JSON.stringify({
    identifier: JSON.stringify({channel: 'RoomChannel'}),
    command: 'message',
    data: JSON.stringify(data),
  });
