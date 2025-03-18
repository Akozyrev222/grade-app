import {all, call, takeEvery} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';
import {types} from '../types';
import {fetchList, fetchPage} from './workers';

function* watchFetchDetail(): SagaIterator {
  yield takeEvery(types.FETCH_SETTINGS, fetchList);
}

function* watchFetchPageDetail(): SagaIterator {
  yield takeEvery(types.FETCH_PAGE, fetchPage);
}

export function* watchSettings(): SagaIterator {
  yield all([call(watchFetchDetail), call(watchFetchPageDetail)]);
}
