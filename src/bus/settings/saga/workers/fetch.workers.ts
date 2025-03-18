import {AxiosResponse} from 'axios';
import {SagaIterator} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {settingsActions} from '../..';
import {apiSettings} from '../../api';
import {SettingsListResponse} from '@/bus/settings/types';

export function* fetchList(): SagaIterator {
  try {
    yield put(settingsActions.setListLoader());

    const response: AxiosResponse<SettingsListResponse> = yield call(
      apiSettings.fetchList,
    );

    if (response.data.static_pages) {
      yield put(settingsActions.getList(response.data.static_pages));
    }
  } catch (e) {
    console.log(`error fetch user detail ${e}`);
  } finally {
    yield put(settingsActions.removeListLoader());
  }
}
