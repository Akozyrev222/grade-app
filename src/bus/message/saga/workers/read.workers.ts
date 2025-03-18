import {all, put, call, select} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {ReadItemsAsync} from '../../types';
import {socketActions} from '@/bus/socket';
import {socketMessageTemplates} from '@/helpers';
import {Room, roomActions, roomSelectors} from '@/bus/room';
import {messageActions} from '../../slice';
import {roleSelectors} from '@/bus/role';

export function* readItems(action: ReadItemsAsync): SagaIterator {
  try {
    const detail: Room.Item = yield select(roomSelectors.getDetail);
    if (detail) {
      const role = yield select(roleSelectors.getRole);
      yield put(
        socketActions.saveEmitItem({
          event: 'read_messages',
          data: socketMessageTemplates.generateMessage<{
            ids: number[];
            action: string;
          }>(detail.id, {
            action: 'read_messages',
            ids: action.payload,
            role,
          }),
        }),
      );
      yield all([
        put(
          roomActions.updateNotRead({
            id: detail.id,
            count: action.payload.length,
          }),
        ),
        put(messageActions.readItems(action.payload)),
      ]);
    }
  } catch (e) {
    console.log(`error read message worker ${e}`);
  }
}
