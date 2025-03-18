import {Room} from '@/bus/room';
import {Message} from '../message';

export namespace Socket {
  export type EventNames = 'message';

  export type ListenerItem = {
    event: EventNames;
    handler: (data: Event) => any;
  };

  export type EmitEvent =
    | 'subscribe'
    | 'create_message'
    | 'create_chat'
    | 'remove_chat'
    | 'read_messages';

  export type EmitItem = {
    event: EmitEvent;
    data: string;
  };

  export type Message = Message.Item;

  export type ProcessMessagePayload = {
    message: Message.Item;
    sender: number;
    tmp_id: number;
  };

  export type ProcessRoomPayload = Room.Item[];

  export type ProcessOnlinePayload = {
    id: number;
    online: string | boolean;
  };
}
