import {SagaIterator} from 'redux-saga';
import {all, call, takeEvery} from 'redux-saga/effects';
import {types} from '../types';
import {fetchItem, updateItem} from './workers';

function* watchFetchItem(): SagaIterator {
  yield takeEvery(types.FETCH_ITEM, fetchItem);
}
function* watchUpdateItem(): SagaIterator {
  yield takeEvery(types.UPDATE_ITEM, updateItem);
}

export function* watchRole(): SagaIterator {
  yield all([call(watchFetchItem), call(watchUpdateItem)]);
}
