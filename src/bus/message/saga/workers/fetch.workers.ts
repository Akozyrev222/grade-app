import {all, put, call} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {FetchItemsAsync} from '../../types';
import {apiMessage} from '../../api';
import {AxiosResponse} from 'axios';
import {Message} from '../../namespace';
import {messageActions} from '../../slice';

export function* fetchItems(action: FetchItemsAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'message', loading: true}));
    const response: AxiosResponse<Message.ResFetchItems> = yield call(
      apiMessage.fetchItems,
      action.payload,
    );
    if (response.data) {
      yield put(
        messageActions.saveNewItems({
          ...response.data,
          hasMore: response.data.pages > 1,
        }),
      );
    }
  } catch (e) {
    console.log(`error fetch items worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'message', loading: false}));
  }
}
