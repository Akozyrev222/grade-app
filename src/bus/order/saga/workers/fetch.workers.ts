import {Order} from '@/bus/order';
import {all, put, call, select} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {apiOrder} from '../../api';
import {
  FetchDetailAsync,
  FetchDetailUserAsync,
  FetchItemsAsync,
  types,
} from '../../types';
import {AxiosResponse} from 'axios';
import {orderActions} from '../../slice';
import {authSelectors} from '@/bus/auth';

export function* fetchItems(action: FetchItemsAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'order', loading: true}));

    if (action.payload.type === 'private') {
      const response: AxiosResponse<Order.ResFetchMyItems> = yield call(
        apiOrder.fetchMyItems,
        action.payload.params,
      );

      if (response.data) {
        yield put(
          orderActions.saveItems({
            items: response.data.my_orders,
            currentPage: action.payload.params.page,
            hasMore: action.payload.params.page < response.data.pages,
          }),
        );
      }
    } else {
      const location = yield call(apiOrder.fetchLocation);

      // if (action.payload.params.page === 1) {
      //   yield put(orderActions.clearItems());
      // }

      const response: AxiosResponse<Order.ResFetchItems> = yield call(
        apiOrder.fetchItems,
        location
          ? {...action.payload.params, ...location}
          : action.payload.params,
      );

      if (response.data) {
        yield put(
          orderActions.saveItems({
            items: response.data.orders,
            currentPage: action.payload.params.page,
            hasMore: action.payload.params.page < response.data.pages,
          }),
        );
      }
    }
  } catch (e) {
    console.log(`error fetch order items worker ${e}`);
  } finally {
    yield all([
      put(uiActions.toggleLoader({name: 'order', loading: false})),
      put({type: types.END_FETCH_ITEMS}),
    ]);
  }
}

export function* fetchDetail(action: FetchDetailAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'order', loading: true}));

    // yield put(orderActions.clearDetail());
    const location = yield call(apiOrder.fetchLocation);

    const response: AxiosResponse<Order.ResFetchDetail> = yield call(
      apiOrder.fetchDetail,
      location ? {...action.payload, ...location} : action.payload,
    );

    if (response.data) {
      yield put(orderActions.saveDetail(response.data));
    }
  } catch (e) {
    console.log(`error fetch order detail worker ${e}`);
  } finally {
    yield all([
      put(uiActions.toggleLoader({name: 'order', loading: false})),
      put({type: types.END_FETCH_DETAIL}),
    ]);
  }
}

export function* fetchDetailUser(action: FetchDetailUserAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'order', loading: true}));

    // yield put(orderActions.clearDetail());

    const response: AxiosResponse<Order.ResFetchDetailUser> = yield call(
      apiOrder.fetchDetailUser,
      action.payload,
    );

    if (response.data) {
      yield put(orderActions.saveDetailUser(response.data));
    }
  } catch (e) {
    console.log(`error fetch order detail worker ${e}`);
  } finally {
    yield all([
      put(uiActions.toggleLoader({name: 'order', loading: false})),
      put({type: types.END_FETCH_DETAIL}),
    ]);
  }
}
