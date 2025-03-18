import {all, put, call, take, select} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {CreateExecutorAsync, types} from '../../types';
import {AxiosResponse} from 'axios';
import {apiUser} from '../../api';
import {User} from '../../namespace';
import {userActions} from '../../slice';
import {goBack} from '@/navigation';
import {roleActions} from '@/bus/role';
import {types as roleTypes} from '@/bus/role/types';
import {authSelectors} from '@/bus/auth';

export function* createExecutor(action: CreateExecutorAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'user', loading: true}));

    const token: string | null = yield select(authSelectors.getRegisterToken);

    const response: AxiosResponse<User.ResUpdateDetail> = yield call(
      apiUser.createExecutor,
      action.payload,
      token,
    );

    if (response.data) {
      yield put(userActions.fetchDetailAsync());
      yield put(roleActions.updateItemAsync('executor'));
      yield put(userActions.clearSpecialization());

      yield put({type: types.END_FETCH_DETAIL});
      yield put({type: roleTypes.END_UPDATE_ITEM});

      goBack();
    }
  } catch (e) {
    console.log(`error create user executor worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'user', loading: false}));
  }
}
