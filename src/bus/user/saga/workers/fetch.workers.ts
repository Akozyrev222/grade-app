import {roleActions, roleSelectors} from '@/bus/role';
import {uiActions} from '@/bus/ui';
import {AxiosResponse} from 'axios';
import {SagaIterator} from 'redux-saga';
import {all, call, put, select, take} from 'redux-saga/effects';
import {User, userActions} from '../..';
import {apiUser} from '../../api';
import {types} from '../../types';
import {types as roleTypes} from '@/bus/role/types';
import {authActions, authSelectors} from '@/bus/auth';
import {messageActions} from '@/bus/message';
import {roomActions} from '@/bus/room';

export function* fetchDetail(): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'user', loading: true}));
    const token: string | null = yield select(authSelectors.getRegisterToken);

    let response: AxiosResponse<User.ResFetchDetail>;

    if (token) {
      response = yield call(apiUser.fetchDetail, token);
    } else {
      response = yield call(apiUser.fetchDetail);
    }
    if (response.data?.user) {
      const role = yield select(roleSelectors.getRole);

      yield all([
        put(userActions.saveDetail(response.data.user)),
        put(roomActions.saveNotReadCount(response.data.user.not_read_count)),
      ]);

      if (!role) {
        yield put(
          roleActions.updateItemAsync(
            response.data.user.executor ? 'executor' : 'customer',
          ),
        );
      }
    }
  } catch (e) {
    console.log(`error fetch user detail ${e}`);

    // yield put(authActions.logoutAsync());
  } finally {
    yield all([
      put({type: types.END_FETCH_DETAIL}),
      put(uiActions.toggleLoader({name: 'user', loading: false})),
    ]);
  }
}
