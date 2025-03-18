import {put, call} from 'redux-saga/effects';
import {referralProgramActions} from '@/bus/referral_program';
import {SagaIterator} from 'redux-saga';
import {apiReferrals} from '../../api';
import {AxiosResponse} from 'axios';
import {ReferralProgramResponse} from '@/bus/referral_program/types';

export function* fetchReferrals(): SagaIterator {
  try {
    yield put(referralProgramActions.setLoading());

    const response: AxiosResponse<ReferralProgramResponse> = yield call(
      apiReferrals.fetchReferrals,
    );

    if (response.data) {
      yield put(referralProgramActions.setProgramsList(response.data));
    }
  } catch (e) {
    console.log(`error fetch detail worker ${e}`);
    yield put(referralProgramActions.removeLoader());
  }
}
