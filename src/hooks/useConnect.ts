import {authSelectors} from '@/bus/auth';
import {Message} from '@/bus/message';
import {roleSelectors} from '@/bus/role';
import {roomActions} from '@/bus/room';
import {socketActions} from '@/bus/socket';
import {SocketActionTypes, types} from '@/bus/socket/types';
import {userActions, userSelectors} from '@/bus/user';
import {socketMessageTemplates} from '@/helpers';
import {store} from '@/store';
import {useCallback, useEffect, useRef} from 'react';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useSocket} from './';

export const useConnect = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelectors.getDetail);
  const token = useSelector(authSelectors.getToken);
  const role = useSelector(roleSelectors.getRole) || 'customer';

  const {connected, onCreateConnection, connecting} = useSocket();

  const onSubscribe = useCallback(() => {
    if (user) {
      if (connected) {
        dispatch(
          socketActions.saveEmitItem({
            event: 'subscribe',
            data: socketMessageTemplates.generateSubscribeGeneral(),
          }),
        );
        user?.chat_ids?.forEach((id) => {
          dispatch(
            socketActions.saveEmitItem({
              event: 'subscribe',
              data: socketMessageTemplates.generateSubscribeRoom(id),
            }),
          );
        });
      }
    }
  }, [user, connected, role, token]);

  useEffect(() => {
    onSubscribe();
  }, [onSubscribe]);

  const onSetHandlers = useCallback(() => {
    if (connected) {
      dispatch(
        socketActions.saveListenerItem({
          event: 'message',
          //@ts-ignore
          handler: (data: SocketActionTypes) => {
            switch (data.type) {
              case types.REMOVE_ROOM: {
                dispatch(socketActions.processRemove(data.chat_id));
                dispatch(userActions.removeChatId(data.chat_id));
                break;
              }
              case types.CREATE_MESSAGE: {
                const role = roleSelectors.getRole(store.getState());
                if (role === data.for_role) {
                  dispatch(
                    socketActions.processMessage({
                      message: data.message,
                      sender: data.recipient_id,
                      tmp_id: data.tmp_id,
                    }),
                  );
                }
                break;
              }
              case types.CREATE_ROOM: {
                const user = userSelectors.getDetail(store.getState());
                if (
                  user &&
                  (user.id == data.for_id || user.id == data.from_id)
                ) {
                  dispatch(socketActions.processRoom(data.chats));
                  dispatch(
                    userActions.addChatId(data.chats.map((item) => item.id)),
                  );
                }
                break;
              }
              case types.CHANGE_ONLINE: {
                dispatch(
                  socketActions.processOnline({
                    id: data.user_id,
                    online: data.online,
                  }),
                );
                break;
              }
              case types.ERRORS: {
                console.log(data);
                break;
              }
            }
          },
        }),
      );
    }
  }, [connected]);


  useEffect(() => {
    onSetHandlers();
  }, [onSetHandlers]);

  return connected;
};
