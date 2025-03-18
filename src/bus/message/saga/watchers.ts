import {SagaIterator} from 'redux-saga';
import {all, call, takeEvery} from 'redux-saga/effects';
import {types} from '../types';
import {createItem, fetchItems, readItems} from './workers';

function* watchCreateItem(): SagaIterator {
  yield takeEvery(types.CREATE_ITEM, createItem);
}

function* watchReadItems(): SagaIterator {
  yield takeEvery(types.READ_ITEMS, readItems);
}

function* watchFetchItems(): SagaIterator {
  yield takeEvery(types.FETCH_ITEMS, fetchItems);
}

export function* watchMessage(): SagaIterator {
  yield all([
    call(watchCreateItem),
    call(watchReadItems),
    call(watchFetchItems),
  ]);
}
