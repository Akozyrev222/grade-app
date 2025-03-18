import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {all, call, put} from 'redux-saga/effects';
import {apiRole} from '../../api';
import {roleActions} from '../../slice';
import {types, UpdateItemAsync} from '../../types';

export function* updateItem(action: UpdateItemAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'user', loading: true}));

    const response = yield call(apiRole.updateItem, action.payload);

    if (response) {
      yield put(roleActions.saveRole(action.payload));
    }
  } catch (e) {
    console.log(`error update role item worker ${e}`);
  } finally {
    yield all([
      // put(uiActions.toggleLoader({name: 'role', loading: false})),
      put({type: types.END_UPDATE_ITEM}),
    ]);
  }
}
