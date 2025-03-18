import {all, put, call} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {CreateItemAsync} from '../../types';
import {apiReview} from '../../api';
import {AxiosResponse} from 'axios';
import {showToast} from '@/services/toast';
import i18n from '@/i18n';
import {goBack} from '@/navigation';

export function* createItem(action: CreateItemAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'review', loading: true}));

    const response: AxiosResponse = yield call(
      apiReview.createItem,
      action.payload,
    );

    if (response.data) {
      showToast({
        text1: i18n.t('messages.review_created'),
        type: 'info',
      });

      goBack();
    }
  } catch (e) {
    console.log(`error create review item worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'review', loading: false}));
  }
}
