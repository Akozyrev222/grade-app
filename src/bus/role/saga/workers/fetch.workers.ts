import {SagaIterator} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {apiRole} from '../../api';
import {Role} from '../../namespace';
import {roleActions} from '../../slice';
import {types} from '../../types';

export function* fetchItem(): SagaIterator {
  try {
    const response: Role.Item | null = yield call(apiRole.fetchItem);

    if (response) {
      yield put(roleActions.saveRole(response));
    }
  } catch (e) {
    console.log(`error fetch role item worker ${e} `);
  } finally {
    yield put({type: types.END_FETCH_ITEM});
  }
}
