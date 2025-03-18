import {SagaIterator} from 'redux-saga';
import {takeEvery, all, call} from 'redux-saga/effects';
import {types} from '../types';
import {createTopItem, createVipItem} from './workers';

function* watchCreateTopItem(): SagaIterator {
  yield takeEvery(types.CREATE_TOP_ITEM, createTopItem);
}

function* watchCreateVipItem(): SagaIterator {
  yield takeEvery(types.CREATE_VIP_ITEM, createVipItem);
}

export function* watchPayment(): SagaIterator {
  yield all([call(watchCreateTopItem), call(watchCreateVipItem)]);
}
