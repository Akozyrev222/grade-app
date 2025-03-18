import {SagaIterator} from 'redux-saga';
import {all, call, takeEvery} from 'redux-saga/effects';
import {types} from '../types';
import {
  createItem,
  fetchDetail,
  fetchDetailUser,
  fetchItems,
  removeItem,
  updateItem,
} from './workers';

function* watchFetchItems(): SagaIterator {
  yield takeEvery(types.FETCH_ITEMS, fetchItems);
}

function* watchFetchDetail(): SagaIterator {
  yield takeEvery(types.FETCH_DETAIL, fetchDetail);
}

function* watchFetchDetailUser(): SagaIterator {
  yield takeEvery(types.FETCH_DETAIL_USER, fetchDetailUser);
}

function* watchCreateItem(): SagaIterator {
  yield takeEvery(types.CREATE_ITEM, createItem);
}

function* watchUpdateItem(): SagaIterator {
  yield takeEvery(types.UPDATE_ITEM, updateItem);
}

function* watchRemoveItem(): SagaIterator {
  yield takeEvery(types.REMOVE_ITEM, removeItem);
}

export function* watchOrder(): SagaIterator {
  yield all([
    call(watchCreateItem),
    call(watchFetchDetail),
    call(watchUpdateItem),
    call(watchFetchItems),
    call(watchFetchDetailUser),
    call(watchRemoveItem),
  ]);
}
