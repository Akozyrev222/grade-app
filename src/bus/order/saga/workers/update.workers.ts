import {apiOrder} from './../../api';
import {all, put, call, take} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {types, UpdateItemAsync} from '../../types';
import {AxiosResponse} from 'axios';
import {orderActions} from '../../slice';
import {goBack} from '@/navigation';
import {Order} from '../../namespace';
import {showToast} from '@/services/toast';
import i18n from '@/i18n';

export function* updateItem(action: UpdateItemAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'order_update', loading: true}));

    const response: AxiosResponse<Order.ResUpdateItem> = yield call(
      apiOrder.updateItem,
      action.payload,
    );

    if (response.data) {
      yield all([
        put(orderActions.fetchDetailAsync({id: action.payload.id})),
        put(orderActions.updateItem(response.data)),
      ]);

      yield take(types.END_FETCH_DETAIL);

      yield put(
        uiActions.toggleForm({
          name: 'order_update',
          reset: true,
        }),
      );

      showToast({
        text1: i18n.t('messages.saved'),
        type: 'info',
      });

      goBack();
    }

    yield put(orderActions.clearSpecialization());
  } catch (e) {
    console.log(`error update order item worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'order_update', loading: false}));
  }
}
