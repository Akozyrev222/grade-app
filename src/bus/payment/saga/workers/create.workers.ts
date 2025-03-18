import {all, put, call, take} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {apiPayment} from '../../api';
import {Payment} from '../../namespace';
import {CreateTopItemAsync, CreateVipItemAsync} from '../../types';
import {showToast} from '@/services/toast';
import i18n from '@/i18n';
import {userActions} from '@/bus/user';

import {types as userTypes} from '@/bus/user/types';

export function* createTopItem(action: CreateTopItemAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'payment', loading: true}));

    const response = yield call(apiPayment.createTopItem, action.payload);

    yield put(userActions.fetchDetailAsync());
    yield take(userTypes.END_FETCH_DETAIL);

    showToast({
      text1: i18n.t('messages.create_top'),
      type: 'info',
    });
  } catch (e) {
    console.log(`error create top item worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'payment', loading: false}));
  }
}

export function* createVipItem(action: CreateVipItemAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'payment', loading: true}));

    const response = yield call(apiPayment.createVipItem, action.payload);

    yield put(userActions.fetchDetailAsync());
    yield take(userTypes.END_FETCH_DETAIL);

    showToast({
      text1: `${i18n.t('messages.create_vip')} ${i18n.t(
        `messages.radiuses.${action.payload.radius}`,
      )}`,
      type: 'info',
    });
  } catch (e) {
    console.log(`error create top item worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'payment', loading: false}));
  }
}
