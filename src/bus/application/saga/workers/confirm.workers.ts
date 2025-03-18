import {applicationActions} from './../../slice';
import {apiApplication} from './../../api';
import {all, put, call} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {ConfirmItemAsync} from '../../types';
import {AxiosResponse} from 'axios';
import {Application} from '../..';
import {orderActions} from '@/bus/order';

export function* confirmItem(action: ConfirmItemAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'application', loading: true}));

    const response: AxiosResponse<Application.ResConfirmItem> = yield call(
      apiApplication.confirmItem,
      action.payload,
    );

    if (response.data) {
      yield all([
        put(applicationActions.removeItem(response.data.order_id)),
        put(orderActions.removeItem({id: response.data.order_id})),
        put(applicationActions.toggleSuccessModal(true)),
      ]);
    }
  } catch (e) {
    console.log(`error confirm application worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'application', loading: false}));
  }
}
