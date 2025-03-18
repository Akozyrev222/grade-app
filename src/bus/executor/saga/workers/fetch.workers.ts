import {all, put, call, select} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {FetchDetailAsync, FetchItemsAsync} from '../../types';
import {apiExecutor} from '../../api';
import {AxiosResponse} from 'axios';
import {Executor} from '../../namespace';
import {executorActions} from '../../slice';
import {App} from '@/bus/app';
import {clearObject, formatExecutors} from '@/helpers';
import {authSelectors} from '@/bus/auth';

export function* fetchItems(action: FetchItemsAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'executor', loading: true}));

    if (action.payload.page === 1) {
      yield put(executorActions.clearItems());
    }

    const location: App.Location = yield call(apiExecutor.fetchLocation);

    const token = yield select(authSelectors.getToken);

    const {distance_id, ...data} = action.payload;

    const params = token ? action.payload : data;

    const response: AxiosResponse<Executor.ResFetchItems> = yield call(
      apiExecutor.fetchItems,
      location ? {...params, ...location} : params,
    );

    const items = formatExecutors({
      executors: response.data.executors,
      tops: response.data.tops,
    });

    if (response.data) {
      yield put(
        executorActions.saveItems({
          currentPage: action.payload.page,
          hasMore:
            items.length !== 0 ||
            response.data.tops.length === 2,
          items,
        }),
      );
    }
  } catch (e) {
    console.log(`error fetch executor items worker ${JSON.stringify(e)}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'executor', loading: false}));
  }
}

export function* fetchDetail(action: FetchDetailAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'executor', loading: true}));

    console.info('start fetch');

    const response: AxiosResponse<Executor.ResFetchDetail> = yield call(
      apiExecutor.fetchDetail,
      action.payload,
    );

    if (response.data) {
      yield put(executorActions.saveDetail(response.data));
    }
  } catch (e) {
    console.log(`error fetch executor detail worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'executor', loading: false}));
  }
}
