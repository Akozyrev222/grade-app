import {all, put, call} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {FetchItemsAsync} from '../../types';
import {apiFavorite} from '../../api';
import {AxiosResponse} from 'axios';
import {Favorite} from '../../namespace';
import {favoriteActions} from '../../slice';

export function* fetchItems(action: FetchItemsAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'favorite', loading: true}));

    const location = yield call(apiFavorite.fetchLocation);

    const response: AxiosResponse<Favorite.ResFetchItems> = yield call(
      apiFavorite.fetchItems,
      {
        ...action.payload,
        ...location,
      },
    );

    if (response.data) {
      yield put(favoriteActions.saveItems(response.data));
    }
  } catch (e) {
    console.log(`error fetch favorite items worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'favorite', loading: false}));
  }
}
