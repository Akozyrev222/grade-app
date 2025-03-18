import {apiAuth} from './../../api';
import {SagaIterator} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {types} from '../../types';
import {authActions} from '../../slice';

export function* fetchToken(): SagaIterator {
  try {
    const response = yield call(apiAuth.fetchToken);

    if (response) {
      yield put(authActions.saveToken(response));
    }
  } catch (e) {
    console.log(`error fetch token worker ${e} `);
  } finally {
    yield put({type: types.END_FETCH_TOKEN});
  }
}
