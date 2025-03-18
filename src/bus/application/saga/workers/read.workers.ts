import {applicationActions} from './../../slice';
import {apiApplication} from './../../api';
import {all, put, call} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {ReadItemAsync} from '../../types';
import {AxiosResponse} from 'axios';
import {Application} from '../..';

export function* readItem(action: ReadItemAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'application', loading: true}));

    const response: AxiosResponse<Application.ResReadItem> = yield call(
      apiApplication.readItem,
      action.payload,
    );

    if (response.data?.success) {
      yield put(applicationActions.fetchItemsAsync({page: 1, per: 10}));
    }
  } catch (e) {
    console.log(`error confirm application worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'application', loading: false}));
  }
}
