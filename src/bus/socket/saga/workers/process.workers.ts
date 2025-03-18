import {all, put, call, select, take} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {
  CreateMessage,
  ProcessMessage,
  ProcessOnline,
  ProcessRemove,
  ProcessRoom,
} from '../../types';
import {Room, roomActions, roomSelectors} from '@/bus/room';
import {messageActions} from '@/bus/message';
import {socketActions} from '../../slice';
import {socketMessageTemplates} from '@/helpers';
import {getCurrent, goBack, Routes} from '@/navigation';
import {types} from '@/bus/room/types';
import {userActions, userSelectors} from '@/bus/user';
import {Platform} from 'react-native';
import {executorActions} from '@/bus/executor';
import {act} from 'react-test-renderer';

export function* processMessage(action: ProcessMessage): SagaIterator {
  try {
    const room = yield select(roomSelectors.getDetail);
    const user = yield select(userSelectors.getDetail);

    if (room) {
      if (
        !action.payload.message.message_images.length &&
        action.payload.message.user_id === user.id
      ) {
        yield all([
          put(
            roomActions.updateLastMessage({
              id: action.payload.message.chat_id,
              message: action.payload.message,
            }),
          ),
          put(
            messageActions.confirmItem({
              id: action.payload.tmp_id,
              item: action.payload.message,
            }),
          ),
          put(userActions.fetchDetailAsync()),
        ]);
      } else {
        if (action.payload.message.user_id !== user.id) {
          yield put(messageActions.createItem(action.payload.message));
        }
      }
    }

    console.info('new Message', Platform.OS);

    yield put(
      roomActions.updateLastMessage({
        id: action.payload.message.chat_id,
        message: action.payload.message,
      }),
    );
  } catch (e) {
    console.log(`error process message  worker ${e}`);
  }
}

export function* processRoom(action: ProcessRoom): SagaIterator {
  try {
    if (action.payload.length) {
      const detail = yield select(roomSelectors.getDetail);
      const route = getCurrent();

      if (route === Routes.ROOM_DETAIL && !detail) {
        yield put(roomActions.fetchDetailAsync({id: action.payload[0].id}));

        yield take(types.END_FETCH_DETAIL);
      }

      yield all([
        put(
          socketActions.saveEmitItem({
            event: 'subscribe',
            data: socketMessageTemplates.generateSubscribeRoom(
              action.payload[0].id,
            ),
          }),
        ),
        put(roomActions.saveItem(action.payload)),
      ]);
    }
  } catch (e) {
    console.log(`error process room item worker ${e} `);
  }
}

export function* processOnline(action: ProcessOnline) {
  try {
    const room: Room.Item = yield select(roomSelectors.getDetail);
    if (room && room.user.id === action.payload.id) {
      yield put(roomActions.updateOnline(action.payload.online));
    }

    yield all([put(executorActions.updateOnline(action.payload))]);
  } catch (e) {
    console.log(`error process onlinbe worker ${e}`);
  }
}

export function* processRemove(action: ProcessRemove) {
  try {
    const room: Room.Item = yield select(roomSelectors.getDetail);

    if (room && room?.id === action.payload) {
      goBack();
    }

    yield put(roomActions.removeItem(action.payload));
  } catch (e) {
    console.log(`error process remove room worker ${e}`);
  }
}
