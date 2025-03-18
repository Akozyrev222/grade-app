import {put, call} from 'redux-saga/effects';
import {referralProgramActions} from '@/bus/referral_program';
import {SagaIterator} from 'redux-saga';
import {apiReferrals} from '../../api';
import {AxiosResponse} from 'axios';
import {showToast} from '@/services/toast';
import {ReferralProgramResponse} from '@/bus/referral_program/types';

export function* activateReferral(action: {
  payload: {id: string};
}): SagaIterator {
  try {
    yield put(referralProgramActions.setActivateReferralLoading());

    const response: AxiosResponse<ReferralProgramResponse> = yield call(
      apiReferrals.activateReferralProgram,
      action.payload,
    );

    if (!response.data.success) {
      showToast({
        type: 'error',
        text1: response.data.message,
      });
    }

    if (response.data.success) {
      yield put(referralProgramActions.fetchReferrals());

      showToast({
        type: 'info',
        text1: response.data.message,
      });
    }
  } catch (e) {
    console.log(`error fetch detail worker ${e}`);
  } finally {
    yield put(referralProgramActions.removeActivateReferralLoader());
  }
}
