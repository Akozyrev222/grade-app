import {AxiosResponse} from 'axios';
import {SagaIterator} from 'redux-saga';
import {all, call, put, select} from 'redux-saga/effects';
import {GoogleLoginAsync} from '../../types';
import {roleActions, roleSelectors} from '@/bus/role';
import {User, userActions} from '@/bus/user';
import {roomActions} from '@/bus/room';
import {types} from '@/bus/user/types';
import {uiActions} from '@/bus/ui';
import {apiAuth} from '@/bus/auth/api';
import {authActions} from '@/bus/auth';
import {reset, Routes} from '@/navigation';
import {showToast, ToastType} from '@/services/toast';

export function* socialNetworksLogin(action: GoogleLoginAsync): SagaIterator {
  try {
    const response: AxiosResponse<User.ResFetchDetail> = yield call(
      apiAuth.socialNetworksLogin,
      action.payload,
    );

    yield put(uiActions.toggleLoader({name: 'user', loading: true}));

    if (response.data?.user) {
      const role = yield select(roleSelectors.getRole);

      yield all([
        put(userActions.saveDetail(response.data.user)),
        put(authActions.saveRegisterToken(response.data.user.auth_token)),
        put(roomActions.saveNotReadCount(response.data.user.not_read_count)),
        put(userActions.fetchDetailAsync()),
      ]);

      if (!role) {
        yield put(
          roleActions.updateItemAsync(
            response.data.user.executor ? 'executor' : 'customer',
          ),
        );
      }

      if (!response.data.user.is_complete) {
        yield call(reset, {
          routes: [{name: Routes.SIGN_IN}, {name: Routes.CHANGE_ROLE}],
          index: 2,
        });
      } else {
        yield put(authActions.saveToken(response.data.user.auth_token));
        yield call(apiAuth.saveToken, response.data.user.auth_token);
      }
    }
  } catch (e) {
    console.log(`error send code worker ${e}`);
    if (e?.data?.message) {
      showToast({text1: e.data.message, type: ToastType.error});
    }
  } finally {
    yield all([
      put({type: types.END_FETCH_DETAIL}),
      put(uiActions.toggleLoader({name: 'user', loading: false})),
    ]);
  }
}
