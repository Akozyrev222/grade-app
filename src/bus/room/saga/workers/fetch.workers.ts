import {all, put, call} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {FetchDetailAsync, FetchItemsAsync, types} from '../../types';
import {apiRoom} from '../../api';
import {AxiosResponse} from 'axios';
import {Room} from '../../namespace';
import {roomActions} from '../../slice';
import {messageActions} from '@/bus/message';

export function* fetchItems(action: FetchItemsAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'room', loading: true}));

    const response: AxiosResponse<Room.ResFetchItems> = yield call(
      apiRoom.fetchItems,
      action.payload,
    );
    if (response.data) {
      yield put(roomActions.saveItems(response.data));
    }
  } catch (e) {
    console.log(`error fetch room items worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'room', loading: false}));
  }
}

export function* fetchDetail(action: FetchDetailAsync): SagaIterator {
  try {
    yield all([
      put(roomActions.clearDetail()),
      put(uiActions.toggleLoader({name: 'room', loading: true})),
    ]);

    const response: AxiosResponse<Room.ResFetchDetail> = yield call(
      apiRoom.fetchDetail,
      action.payload,
    );
    if (response.data) {
      yield all([
        put(roomActions.saveDetail(response?.data?.chat as Room.Item)),
        put(messageActions.saveItems(response?.data?.chat?.messages)),
      ]);
    }
  } catch (e) {
    console.log(`error fetch room detail worker ${e}`);
  } finally {
    yield all([
      put(uiActions.toggleLoader({name: 'room', loading: false})),
      put({type: types.END_FETCH_DETAIL}),
    ]);
  }
}
