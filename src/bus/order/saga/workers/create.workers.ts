import {apiOrder} from './../../api';
import {all, put, call, take} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {CreateItemAsync, types} from '../../types';
import {showToast} from '@/services/toast';
import i18n from '@/i18n';
import {navigate, Routes} from '@/navigation';
import {orderActions} from '../../slice';
import { EVENTS, logEvent } from '@/hooks/useAppsFlyer';

export function* createItem(action: CreateItemAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'order', loading: true}));

    const response = yield call(apiOrder.createItem, action.payload);

    showToast({
      text1: i18n.t('messages.create_order'),
      type: 'info',
    });

    yield put(
      uiActions.toggleForm({
        name: 'order',
        reset: true,
      }),
    );

    yield put(
      orderActions.fetchItemsAsync({
        params: {page: 1, per: 10},
        type: 'private',
      }),
    );

    yield take(types.END_FETCH_ITEMS);

    logEvent(EVENTS.CREATE_ORDER);

    navigate(Routes.PROFILE_ORDER_LIST);

    yield put(orderActions.clearSpecialization());
  } catch (e) {
    console.log(`error create order item worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'order', loading: false}));
  }
}
