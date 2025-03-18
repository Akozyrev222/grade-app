import {all, put, call} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {RemoveItemAsync} from '../../types';
import {apiOrder} from '../../api';
import {orderActions} from '../../slice';
import {goBack} from '@/navigation';
import {showToast} from '@/services/toast';
import i18n from '@/i18n';

export function* removeItem(action: RemoveItemAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'order_action', loading: true}));

    const response = yield call(apiOrder.removeItem, action.payload);

    yield put(orderActions.removeItem(action.payload));

    goBack();
    goBack();

    showToast({
      type: 'info',
      text1: i18n.t('messages.removed'),
    });
  } catch (e) {
    console.log(`error remove order item worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'order_action', loading: false}));
  }
}
