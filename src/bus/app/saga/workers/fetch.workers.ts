import {appActions} from './../../slice';
import {call, put} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';
import {types} from '../../types';
import {apiApp} from '../../api';
import {App} from '../../namespace';

export function* fetchLanguage(): SagaIterator {
  try {
    const response: App.Language = yield call(apiApp.fetchLanguage);

    yield put(appActions.saveLanguage(response));
  } catch (e) {
    console.log(`error fetch language worker ${e}`);
  } finally {
    yield put({type: types.END_FETCH_LANGUAGE});
  }
}
