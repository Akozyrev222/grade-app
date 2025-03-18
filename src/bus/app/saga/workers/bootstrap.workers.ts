import {appActions} from './../../slice';
import {all, put, select, take} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';
import {types} from '../../types';
import {types as roleTypes} from '@/bus/role/types';
import {types as authTypes} from '@/bus/auth/types';
import {types as userTypes} from '@/bus/user/types';
import {types as filterTypes} from '@/bus/filter/types';

import {roleActions} from '@/bus/role';
import {authActions, authSelectors} from '@/bus/auth';
import {userActions} from '@/bus/user';
import {filterActions} from '@/bus/filter';

export function* bootstrap(): SagaIterator {
  try {
    yield all([
      put(appActions.fetchLanguageAsync()),
      put(roleActions.fetchItemAsync()),
      put(authActions.fetchTokenAsync()),
      put(filterActions.fetchDistancesAsync()),
    ]);

    yield all([
      take(types.END_FETCH_LANGUAGE),
      take(roleTypes.END_FETCH_ITEM),
      take(authTypes.END_FETCH_TOKEN),
      take(filterTypes.END_FETCH_DISTANCES),
    ]);

    const token: string | null = yield select(authSelectors.getToken);

    if (token) {
      yield all([put(userActions.fetchDetailAsync())]);

      yield all([take(userTypes.END_FETCH_DETAIL)]);
    }
  } catch (e) {
    console.log(`error app bootstrap worker ${e}`);
  } finally {
    yield put(appActions.toggleInitialized(true));
  }
}
