import {all, put, call} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {CreateItemAsync} from '../../types';
import {apiFavorite} from '../../api';
import {AxiosResponse} from 'axios';
import {Favorite} from '../../namespace';
import {executorActions} from '@/bus/executor';
import {favoriteActions} from '../../slice';

export function* createItem(action: CreateItemAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'favorite', loading: true}));

    const response: AxiosResponse<Favorite.ResCreateItem> = yield call(
      apiFavorite.createItem,
      action.payload,
    );
    if (response.data.success) {
      yield put(executorActions.toggleFavorite(true));
    }
  } catch (e) {
    console.log(`error create favorite item worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'favorite', loading: false}));
  }
}
