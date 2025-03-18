import {appActions} from './../../slice';
import {apiApp} from './../../api';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {UpdateLanguageAsync} from '../../types';
import i18next from 'i18next';
import {reset, Routes} from '@/navigation';
import {filterActions} from '@/bus/filter';
import {categoryActions} from '@/bus/category';

export function* updateLanguage(action: UpdateLanguageAsync): SagaIterator {
  try {
    // yield put(uiActions.toggleLoader({name: 'language', loading: true}));

    const response: boolean = yield call(apiApp.updateLanguage, action.payload);

    if (response) {
      yield put(appActions.saveLanguage(action.payload));
      yield put(filterActions.fetchDistancesAsync());
      yield put(
        categoryActions.fetchItemsAsync({
          name: '',
        }),
      );
      yield call(i18next.changeLanguage, action.payload);
    }
  } catch (e) {
    console.log(`error update language ${e}`);
  } finally {
    // yield put(uiActions.toggleLoader({name: 'language', loading: false}));
  }
}
