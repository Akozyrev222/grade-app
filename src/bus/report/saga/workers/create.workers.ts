import {all, put, call} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {AxiosResponse} from 'axios';
import {apiReport} from '../../api';
import {CreateItemAsync} from '../../types';
import {showToast} from '@/services/toast';
import i18n from '@/i18n';
import {goBack} from '@/navigation';

export function* createItem(action: CreateItemAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'report', loading: true}));

    const response: AxiosResponse = yield call(
      apiReport.createItem,
      action.payload,
    );

    if (response.data) {
      showToast({
        type: 'info',
        text1: i18n.t('messages.report_created'),
      });

      goBack();
      goBack();
    }
  } catch (e) {
    console.log(`error creat report item worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'report', loading: false}));
  }
}
