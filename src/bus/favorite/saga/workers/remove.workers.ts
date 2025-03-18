import {all, put, call} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {AxiosResponse} from 'axios';
import {Favorite} from '../../namespace';
import {apiFavorite} from '../../api';
import {RemoveItemAsync} from '../../types';
import {executorActions} from '@/bus/executor';
import {favoriteActions} from '../../slice';

export function* removeItem(action: RemoveItemAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'favorite', loading: true}));

    const response: AxiosResponse<Favorite.ResCreateItem> = yield call(
      apiFavorite.removeItem,
      action.payload,
    );
    if (response.data.success) {
      yield all([
        put(favoriteActions.removeItem(action.payload.id)),
        put(executorActions.toggleFavorite(false)),
      ]);
    }
  } catch (e) {
    console.log(`error remove favorite item worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'favorite', loading: false}));
  }
}
