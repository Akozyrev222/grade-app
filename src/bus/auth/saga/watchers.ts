import {SagaIterator} from 'redux-saga';
import {all, call, takeEvery} from 'redux-saga/effects';
import {types} from '../types';
import {
  fetchToken,
  signUp,
  logout,
  sendCode,
  confirmCode,
  updateToken,
} from './workers';
import {socialNetworksLogin} from '@/bus/auth/saga/workers/socialNetworksLogin.workers';

function* watchFetchToken(): SagaIterator {
  yield takeEvery(types.FETCH_TOKEN, fetchToken);
}

function* watchSignUp(): SagaIterator {
  yield takeEvery(types.SIGN_UP, signUp);
}

function* watchLogout(): SagaIterator {
  yield takeEvery(types.LOGOUT, logout);
}

function* watchSendCode(): SagaIterator {
  yield takeEvery(types.SEND_CODE, sendCode);
}

function* watchConfirmCode(): SagaIterator {
  yield takeEvery(types.CONFIRM_CODE, confirmCode);
}

function* watchUpdateToken(): SagaIterator {
  yield takeEvery(types.UPDATE_TOKEN, updateToken);
}

function* watchGoogleLogin(): SagaIterator {
  yield takeEvery(types.SOCIAL_NETWORKS_LOGIN, socialNetworksLogin);
}

export function* watchAuth(): SagaIterator {
  yield all([
    call(watchSignUp),
    call(watchFetchToken),
    call(watchLogout),
    call(watchSendCode),
    call(watchConfirmCode),
    call(watchUpdateToken),
    call(watchGoogleLogin),
  ]);
}
