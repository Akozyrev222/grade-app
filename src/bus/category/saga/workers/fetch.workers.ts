import {all, put, call} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {apiCategory} from '../../api';
import {AxiosResponse} from 'axios';
import {Category} from '../../namespace';
import {categoryActions} from '../../slice';
import {FetchItemsAsync} from '../../types';

export function* fetchItems(action: FetchItemsAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'category', loading: true}));

    const response: AxiosResponse<Category.ResFetchItems> = yield call(
      apiCategory.fetchItems,
      action.payload,
    );

    if (response.data) {
      yield all([
        put(categoryActions.saveItems(response.data)),
        put(categoryActions.updateName(action.payload.name)),
      ]);
    }
  } catch (e) {
    console.log(`error fetch category items worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'category', loading: false}));
  }
}
