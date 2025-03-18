import {all, put, call, takeEvery, take} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {apiUser} from '../../api';
import {apiAuth} from '@/bus/auth/api';

import {AxiosResponse} from 'axios';

import {userActions} from '../../slice';
import {authActions} from '@/bus/auth';
import {roleActions} from '@/bus/role';
import {favoriteActions} from '@/bus/favorite';

import {types as authTypes} from '@/bus/auth/types';
import {types as rolesTypes} from '@/bus/role/types';

export function* removeDetail(): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'logout', loading: true}));

    const response: AxiosResponse = yield call(apiUser.removeDetail);
    yield all([
      put(userActions.clearDetail()),
      call(apiAuth.saveToken, ''),
      put(authActions.clearToken()),
      put(userActions.clearDetail()),
      put(roleActions.updateItemAsync(null)),
      put(favoriteActions.saveItems({favorite_users: []})),
    ]);

    yield all([take(rolesTypes.END_UPDATE_ITEM)]);
  } catch (e) {
    console.log(`error remove user detail worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'logout', loading: false}));
  }
}
