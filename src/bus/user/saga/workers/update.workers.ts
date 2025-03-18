import {all, put, call, take, select} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {types, UpdateDetailAsync, UpdateDeviceTokenAsync} from '../../types';
import {apiUser} from '../../api';
import {userActions} from '../../slice';
import {AxiosResponse} from 'axios';
import {User} from '../../namespace';
import {goBack, navigate, Routes} from '@/navigation';
import {authActions, authSelectors} from '@/bus/auth';
import {showToast} from '@/services/toast';
import i18n from '@/i18n';
import {Platform} from 'react-native';

export function* updateDetail(action: UpdateDetailAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'user_update', loading: true}));

    const response: AxiosResponse<User.ResUpdateDetail> = yield call(
      apiUser.updateDetail,
      action.payload,
    );

    if (response.data.update_phone) {
      const phone = action.payload.phone.value.split(' ');

      yield put(
        authActions.savePhone({
          code: phone[0],
          value: phone.slice(1).join(' '),
        }),
      );

      showToast({
        text1: i18n.t('messages.confirm_phone'),
        type: 'error',
      });

      navigate(Routes.CONFIRM_CODE, {parent: 'PROFILE_LIST'});
    } else {
      yield put(userActions.fetchDetailAsync());

      yield take(types.END_FETCH_DETAIL);

      showToast({
        text1: i18n.t('messages.saved'),
        type: 'info',
        topOffset: Platform.OS === 'ios' ? 112 : 102,
      });
      goBack();
    }

    yield put(userActions.clearSpecialization());
  } catch (e) {
    console.log(`error update user detail worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'user_update', loading: false}));
  }
}

export function* updateDeviceToken(
  action: UpdateDeviceTokenAsync,
): SagaIterator {
  try {
    const token: string | null = yield select(authSelectors.getRegisterToken);

    yield call(apiUser.updateDeviceToken, action.payload, token);
    yield put(userActions.saveDeviceToken(action.payload.device_token));
  } catch (e) {
    console.log(`error update device token ${e}`);
  }
}
