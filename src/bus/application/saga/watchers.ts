import {SagaIterator} from 'redux-saga';
import {all, call, takeEvery} from 'redux-saga/effects';
import {types} from '../types';
import {createItem, fetchItems, confirmItem, readItem} from './workers';

function* watchFetchItems(): SagaIterator {
  yield takeEvery(types.FETCH_ITEMS, fetchItems);
}

function* watchCreateItem(): SagaIterator {
  yield takeEvery(types.CREATE_ITEM, createItem);
}

function* watchConfirmItem(): SagaIterator {
  yield takeEvery(types.CONFIRM_ITEM, confirmItem);
}

function* watchReadItem(): SagaIterator {
  yield takeEvery(types.READ_ITEM, readItem);
}

export function* watchApplication(): SagaIterator {
  yield all([
    call(watchFetchItems),
    call(watchCreateItem),
    call(watchConfirmItem),
    call(watchReadItem),
  ]);
}
