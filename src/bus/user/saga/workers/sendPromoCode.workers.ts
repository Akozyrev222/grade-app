import {call, put, take} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';
import {SendPromoCode} from '../../types';
import {AxiosError, AxiosResponse} from 'axios';
import {apiUser} from '../../api';
import {showToast, ToastType} from '@/services/toast';
import {userActions} from '@/bus/user';

import {types as userTypes} from '@/bus/user/types';
import { EVENTS, logEvent } from '@/hooks/useAppsFlyer';

export function* sendPromoCode(action: SendPromoCode): SagaIterator {
  try {
    yield put(userActions.addLoading());
    const response: AxiosResponse = yield call(
      apiUser.createPromoCode,
      action.payload,
    );

    if (response.data.success) {
      yield put(userActions.promoCodeSuccess());
      yield put(userActions.fetchDetailAsync());
      yield take(userTypes.END_FETCH_DETAIL);
    }

    logEvent(EVENTS.USE_PROMOCODE)

    showToast({
      type: response.data.success ? ToastType.info : ToastType.info,
      text1: response.data.message,
    });
  } catch (e) {
    const error = e as AxiosError<{message: string; status: number}>;
    if (error.response.data.status === 404) {
      showToast({
        type: ToastType.info,
        text1: error.response.data.message,
      });
    }

    if (error.response.data.status === 422) {
      showToast({
        type: ToastType.error,
        text1: error.response.data.message,
      });
    }
  } finally {
    yield put(userActions.removeLoading());
  }
}
