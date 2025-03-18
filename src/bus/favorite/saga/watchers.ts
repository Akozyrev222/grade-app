import {SagaIterator} from 'redux-saga';
import {all, call, takeEvery} from 'redux-saga/effects';
import {types} from '../types';
import {createItem, fetchItems, removeItem} from './workers';

function* watchFetchItems(): SagaIterator {
  yield takeEvery(types.FETCH_ITEMS, fetchItems);
}

function* watchCreateItem(): SagaIterator {
  yield takeEvery(types.CREATE_ITEM, createItem);
}

function* watchRemoveItem(): SagaIterator {
  yield takeEvery(types.REMOVE_ITEM, removeItem);
}

export function* watchFavorite(): SagaIterator {
  yield all([
    call(watchCreateItem),
    call(watchFetchItems),
    call(watchRemoveItem),
  ]);
}
