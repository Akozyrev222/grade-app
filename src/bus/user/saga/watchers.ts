import {all, call, takeEvery} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';
import {types} from '../types';
import {
  fetchDetail,
  updateDetail,
  verificate,
  confirmPhone,
  updateDeviceToken,
  removeDetail,
  createExecutor,
  sendPromoCode,
} from './workers';

function* watchFetchDetail(): SagaIterator {
  yield takeEvery(types.FETCH_DETAIL, fetchDetail);
}

function* watchVerificate(): SagaIterator {
  yield takeEvery(types.VERIFICATE, verificate);
}

function* watchUpdateDetail(): SagaIterator {
  yield takeEvery(types.UPDATE_DETAIL, updateDetail);
}

function* watchConfirmPhone(): SagaIterator {
  yield takeEvery(types.CONFIRM_PHONE, confirmPhone);
}

function* watchUpdateDeviceToken(): SagaIterator {
  yield takeEvery(types.UPDATE_DEVICE_TOKEN, updateDeviceToken);
}

function* watchRemoveDetail(): SagaIterator {
  yield takeEvery(types.REMOVE_DETAIL, removeDetail);
}

function* watchCreateExecutor(): SagaIterator {
  yield takeEvery(types.CREATE_EXECUTOR, createExecutor);
}

function* watchSendPromoCode(): SagaIterator {
  yield takeEvery(types.SEND_PROMOCODE, sendPromoCode);
}

export function* watchUser(): SagaIterator {
  yield all([
    call(watchFetchDetail),
    call(watchVerificate),
    call(watchUpdateDetail),
    call(watchConfirmPhone),
    call(watchUpdateDeviceToken),
    call(watchRemoveDetail),
    call(watchCreateExecutor),
    call(watchSendPromoCode),
  ]);
}
