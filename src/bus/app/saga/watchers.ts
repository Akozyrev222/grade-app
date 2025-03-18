import {SagaIterator} from 'redux-saga';
import {all, call, takeEvery} from 'redux-saga/effects';
import {types} from '../types';

import {fetchLanguage, bootstrap, updateLanguage} from './workers';

function* watchFetchLanguage(): SagaIterator {
  yield takeEvery(types.FETCH_LANGUAGE, fetchLanguage);
}

function* watchBootstrap(): SagaIterator {
  yield takeEvery(types.BOOTSTRAP, bootstrap);
}

function* watchUpdateLanguage(): SagaIterator {
  yield takeEvery(types.UPDATE_LANGUAGE, updateLanguage);
}

export function* watchApp(): SagaIterator {
  yield all([
    call(watchBootstrap),
    call(watchFetchLanguage),
    call(watchUpdateLanguage),
  ]);
}
