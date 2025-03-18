import {AxiosResponse} from 'axios';
import {SagaIterator} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {settingsActions} from '../..';
import {apiSettings} from '../../api';
import {fetchPageDetails, SettingsItemResponse} from '@/bus/settings/types';

export function* fetchPage(action: fetchPageDetails): SagaIterator {
  try {
    yield put(settingsActions.setPageLoader());

    const response: AxiosResponse<SettingsItemResponse> = yield call(
      apiSettings.fetchPage,
      action.payload,
    );

    if (response.data.static_pages) {
      yield put(settingsActions.getPage(response.data.static_pages));
    }
  } catch (e) {
    console.log(`error fetch user detail ${e}`);
  } finally {
    yield put(settingsActions.removePageLoader());
  }
}
