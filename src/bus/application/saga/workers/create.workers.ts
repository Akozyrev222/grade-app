import {Application, applicationActions} from '@/bus/application';
import {all, put, call} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {CreateItemAsync} from '../../types';
import {AxiosResponse} from 'axios';
import {apiApplication} from '../../api';
import {goBack, navigate, Routes} from '@/navigation';
import {showToast} from '@/services/toast';
import i18n from '@/i18n';
import {orderActions} from '@/bus/order';

export function* createItem(action: CreateItemAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'application', loading: true}));

    const response: AxiosResponse<Application.ResCreateItem> = yield call(
      apiApplication.createItem,
      action.payload,
    );

    yield all([
      put(orderActions.updateReview(action.payload.order_id)),
      put(applicationActions.fetchItemsAsync({page: 1, per: 10})),
    ]);

    goBack();
    goBack();

    navigate(Routes.APPLICATON);
    showToast({
      type: 'info',
      text1: i18n.t('messages.create_application'),
    });
  } catch (e) {
    console.log(`error create application item worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'application', loading: false}));
  }
}
