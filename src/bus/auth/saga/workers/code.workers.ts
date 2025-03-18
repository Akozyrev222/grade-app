import {authActions} from '@/bus/auth';
import {uiActions} from '@/bus/ui';
import i18n from '@/i18n';
import {navigate, reset, Routes} from '@/navigation';
import {showToast} from '@/services/toast';
import {AxiosResponse, AxiosError} from 'axios';
import {SagaIterator} from 'redux-saga';
import {call, put, take} from 'redux-saga/effects';
import {Auth} from '../..';
import {apiAuth} from '../../api';
import {ConfirmCodeAsync, SendCodeAsync, types} from '../../types';

export function* sendCode(action: SendCodeAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'code', loading: true}));
    const response: AxiosResponse<Auth.ResSendCode> = yield call(
      apiAuth.sendCode,
      action.payload,
    );

    if (response.data.success) {
      yield put(authActions.savePhone(action.payload.phone));
    }

    if (!response.data.is_complete) {
      showToast({
        type: 'info',
        text1: i18n.t('messages.unauthorized'),
      });
    }

    yield call(navigate, Routes.CONFIRM_CODE);
  } catch (e) {
    console.log(`error send code worker ${e}`);
    const error = e as AxiosError<{message: string}>;

    if (error.response.data?.message) {
      showToast({text1: error.response.data.message, type: 'error'});
    }
  } finally {
    yield put(uiActions.toggleLoader({name: 'code', loading: false}));
  }
}

export function* confirmCode(action: ConfirmCodeAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'code', loading: true}));

    const response: AxiosResponse<Auth.ResConfirmCode> = yield call(
      apiAuth.confirmCode,
      action.payload,
    );

    if (response.data?.auth_token) {
      if (response.data.is_complete) {
        yield put(authActions.updateTokenAsync(response.data.auth_token));

        yield take(types.END_UPDATE_TOKEN);
      } else {
        yield put(authActions.saveRegisterToken(response.data.auth_token));

        yield call(reset, {
          routes: [{name: Routes.SIGN_IN}, {name: Routes.CHANGE_ROLE}],
          index: 2,
        });
      }
    }
  } catch (e) {
    console.log(`error confirm code worker ${e}`);

    const error = e as AxiosError<{error: string}>;

    if (error.response.data?.error) {
      showToast({text1: error.response.data.error, type: 'error'});
    }
  } finally {
    yield put(uiActions.toggleLoader({name: 'code', loading: false}));
  }
}
