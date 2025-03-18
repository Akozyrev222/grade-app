import {SagaIterator} from 'redux-saga';
import {all, call, takeEvery} from 'redux-saga/effects';

import {types} from '../types';
import {createItem} from './workers';

function* watchCreateItem(): SagaIterator {
  yield takeEvery(types.CREATE_ITEM, createItem);
}

export function* watchReview(): SagaIterator {
  yield all([call(watchCreateItem)]);
}
