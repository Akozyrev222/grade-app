import {all, put, call, select} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {AxiosResponse} from 'axios';
import {Application} from '../../namespace';
import {apiApplication} from '../../api';
import {FetchItemsAsync} from '../../types';
import {Role, roleSelectors} from '@/bus/role';
import {applicationActions} from '../../slice';

export function* fetchItems(action: FetchItemsAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'application', loading: true}));

    const role: Role.Item = yield select(roleSelectors.getRole);

    if (role === 'customer') {
      const response: AxiosResponse<Application.ResFetchItems> = yield call(
        apiApplication.fetchCustomerItems,
        action.payload,
      );
      if (response.data) {
        yield put(
          applicationActions.saveItems({
            ...response.data,
            page: action.payload.page,
          }),
        );
      }
    } else {
      const response: AxiosResponse<Application.ResFetchItems> = yield call(
        apiApplication.fetchExecutorItems,
        action.payload,
      );

      if (response.data) {
        yield put(
          applicationActions.saveItems({
            ...response.data,
            page: action.payload.page,
          }),
        );
      }
    }
  } catch (e) {
    console.log(`error fetch application items worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'application', loading: false}));
  }
}
