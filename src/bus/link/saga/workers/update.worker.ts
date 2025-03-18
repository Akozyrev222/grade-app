import {SagaIterator} from 'redux-saga';
import {all, call, put} from 'redux-saga/effects';
import {apiLink} from '../../api';
import {linkActions} from '../../slice';
import {types, UpdateItemAsync} from '../../types';

export function* updateItem(action: UpdateItemAsync): SagaIterator {
  
  try {
    const response = yield call(apiLink.updateItem, action.payload);

    if (response) {
      yield put(linkActions.saveLink(action.payload));
    }
  } catch (e) {
    console.log(`error update link item worker ${e}`);
  } finally {
    yield all([
      // put(uiActions.toggleLoader({name: 'role', loading: false})),
      put({type: types.END_UPDATE_ITEM}),
    ]);
  }
}
