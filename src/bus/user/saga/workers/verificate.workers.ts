import {userActions} from './../../slice';
import {AxiosError, AxiosResponse} from 'axios';
import {uiActions} from './../../../ui/slice';
import {SagaIterator} from 'redux-saga';
import {types, VerificateAsync} from '../../types';
import {put, call, take} from 'redux-saga/effects';
import {User} from '../..';
import {apiUser} from '../../api';
import {navigate, Routes} from '@/navigation';
import {showToast} from '@/services/toast';
import {EVENTS, logEvent} from '@/hooks/useAppsFlyer';

export function* verificate(action: VerificateAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'verification', loading: true}));

    const response: AxiosResponse<User.ResVerificate> = yield call(
      apiUser.verificate,
      action.payload,
    );

    yield put(userActions.fetchDetailAsync());

    yield take(types.END_FETCH_DETAIL);

    yield call(navigate, Routes.PROFILE_LIST);

    logEvent(EVENTS.PASS_VERIFICATION);

    showToast({text1: response?.data?.message, type: 'info'});
  } catch (e) {
    console.log(`error verificate user worker ${e}`);

    const error = e as AxiosError;
  } finally {
    yield put(uiActions.toggleLoader({name: 'verification', loading: false}));
  }
}
