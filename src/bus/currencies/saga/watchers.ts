import {SagaIterator} from 'redux-saga';
import {all, call, takeEvery} from 'redux-saga/effects';
import {types} from '../types';

import {fetchItems} from './workers';

function* watchFetchItems(): SagaIterator {
  yield takeEvery(types.FETCH_ITEMS, fetchItems);
}

export function* watchCurrencies(): SagaIterator {
  yield all([call(watchFetchItems)]);
}
