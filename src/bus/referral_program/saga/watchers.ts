import {SagaIterator} from 'redux-saga';
import {all, call, takeEvery} from 'redux-saga/effects';
import {types} from '../types';
import {fetchReferrals} from '@/bus/referral_program/saga/workers/fetch.workers';
import {activateReferral} from '@/bus/referral_program/saga/workers/activateReferral.worker';

function* watchFetchReferrals(): SagaIterator {
  yield takeEvery(types.FETCH_REFERRALS, fetchReferrals);
}

function* watchActivateReferral(): SagaIterator {
  yield takeEvery(types.ACTIVATE_REFERRAL, activateReferral);
}

export function* watchReferrals(): SagaIterator {
  yield all([call(watchFetchReferrals), call(watchActivateReferral)]);
}
