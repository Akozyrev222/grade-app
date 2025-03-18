import {all, call, put, take} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';
import {types, UpdateTokenAsync} from './../../types';

import {types as userTypes} from '@/bus/user/types';

import {apiAuth} from '../../api';
import {authActions} from '../..';
import {userActions} from '@/bus/user';
export function* updateToken(action: UpdateTokenAsync): SagaIterator {
  try {
    const response = yield call(apiAuth.saveToken, action.payload);

    if (response) {
      yield all([
        put(authActions.saveToken(action.payload)),
        put(authActions.clearPhone()),
        put(userActions.fetchDetailAsync()),
      ]);

      yield take(userTypes.END_FETCH_DETAIL);
    }
  } catch (e) {
    console.log(`error update token worker ${e}`);
  } finally {
    yield put({type: types.END_UPDATE_TOKEN});
  }
}
