import {SagaIterator} from 'redux-saga';
import {all, call, takeEvery} from 'redux-saga/effects';
import {types} from '../types';

import {createItem, fetchDetail, fetchItems, removeItem} from './workers';

function* wacthFetchItems(): SagaIterator {
  yield takeEvery(types.FETCH_ITEMS, fetchItems);
}

function* wacthFetchDetail(): SagaIterator {
  yield takeEvery(types.FETCH_DETAIL, fetchDetail);
}

function* wacthRemoveItem(): SagaIterator {
  yield takeEvery(types.REMOVE_ITEM, removeItem);
}

function* watchCreateItem(): SagaIterator {
  yield takeEvery(types.CREATE_ITEM, createItem);
}

export function* watchRoom(): SagaIterator {
  yield all([
    call(wacthFetchDetail),
    call(wacthFetchItems),
    call(wacthRemoveItem),
    call(watchCreateItem),
  ]);
}
