import {AxiosError, AxiosResponse} from 'axios';
import {apiAuth} from './../../api';
import {uiActions} from './../../../ui/slice';
import {all, call, put, select, take} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';
import {SignUpAsync} from '../../types';
import {Auth, authActions, authSelectors} from '../..';
import {showToast} from '@/services/toast';
import {userActions} from '@/bus/user';
import {types} from '@/bus/user/types';
import {navigate, Routes} from '@/navigation';
import { EVENTS, logEvent } from '@/hooks/useAppsFlyer';

export function* signUp(action: SignUpAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'sign_up', loading: true}));

    const token: string | null = yield select(authSelectors.getRegisterToken);
    const authToken = yield select(authSelectors.getToken);
    if (token || authToken) {
      const response: AxiosResponse<Auth.ResSignUp> = yield call(
        apiAuth.signUp,
        action.payload,
        token || authToken,
      );

      if (response.data?.auth_token) {
        yield all([
          put(authActions.saveToken(response.data.auth_token)),
          put(authActions.clearRegisterToken()),
          put(userActions.fetchDetailAsync()),
          call(apiAuth.saveToken, response.data.auth_token),
        ]);
        yield take(types.END_FETCH_DETAIL);

        logEvent(EVENTS.SUCCESSFULL_REG);
        navigate(Routes.HOME);
      }
    }
  } catch (e) {
    console.log(`error sign up worker ${e}`);

    const error = e as AxiosError<{errors: string[]}>;

    if (Array.isArray(error.response.data?.errors)) {
      showToast({text1: error.response.data.errors[0], type: 'error'});
    } else if (typeof error.response.data?.errors === 'string') {
      showToast({text2: error.response.data.errors, type: 'error'});
    }
  } finally {
    yield put(uiActions.toggleLoader({name: 'sign_up', loading: false}));
  }
}
