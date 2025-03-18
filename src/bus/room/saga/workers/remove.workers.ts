import {all, put, call, select} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {RemoveItemAsync} from '../../types';
import {AxiosResponse} from 'axios';
import {apiRoom} from '../../api';
import {socketActions} from '@/bus/socket';
import {socketMessageTemplates} from '@/helpers';
import {roleSelectors} from '@/bus/role';

export function* removeItem(action: RemoveItemAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'room', loading: true}));

    const role = yield select(roleSelectors.getRole);

    yield put(
      socketActions.saveEmitItem({
        event: 'remove_chat',
        data: socketMessageTemplates.generateMessage(action.payload.id, {
          action: 'remove_chat',
          chat_id: action.payload.id,
          role,
        }),
      }),
    );
  } catch (e) {
    console.log(`error remove room item worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'room', loading: false}));
  }
}
