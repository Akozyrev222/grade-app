import {Room} from '@/bus/room';
import {all, put, call, select} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {CreateItemAsync} from '../../types';
import {User, userSelectors} from '@/bus/user';
import {Role, roleSelectors} from '@/bus/role';
import {apiRoom} from '../../api';
import {AxiosResponse} from 'axios';
import {roomActions} from '../../slice';
import {messageActions} from '@/bus/message';
import {socketActions} from '@/bus/socket';
import {socketMessageTemplates} from '@/helpers';

export function* createItem(action: CreateItemAsync): SagaIterator {
  try {
    yield all([
      put(roomActions.clearDetail()),
      put(uiActions.toggleLoader({name: 'room', loading: true})),
    ]);

    const user: User.Item = yield select(userSelectors.getDetail);
    const role: Role.Item = yield select(roleSelectors.getRole);

    const data = {
      ...action.payload,
      [role === 'customer' ? 'customer_id' : 'executor_id']: user.id,
    };
    yield put(
      socketActions.saveEmitItem({
        event: 'create_chat',
        data: socketMessageTemplates.generateGeneralMessage({
          ...data,
          action: 'create_chat',
          role,
        }),
      }),
    );
  } catch (e) {
    console.log(`error create room item worker ${e} `);
  } finally {
    yield put(uiActions.toggleLoader({name: 'room', loading: false}));
  }
}
