import {AxiosResponse} from 'axios';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {all, call, put, take} from 'redux-saga/effects';
import {apiAuth} from '../../api';
import {authActions} from '../..';
import {navigate, reset, Routes} from '@/navigation';
import {userActions} from '@/bus/user';
import {roleActions} from '@/bus/role';
import {types} from '@/bus/role/types';
import {filterActions} from '@/bus/filter';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';

export function* logout(): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'logout', loading: true}));

    const response: AxiosResponse = yield call(apiAuth.logout);

    LoginManager.logOut();

    yield all([
      call(apiAuth.saveToken, ''),
      put(authActions.clearToken()),
      put(userActions.clearDetail()),
      put(roleActions.updateItemAsync(null)),
      put(filterActions.updateSearch('')),
      call(GoogleSignin.revokeAccess),
      call(GoogleSignin.signOut),
    ]);
    // yield call(navigate, Routes.AUTH);
  } catch (e) {
    console.log(`error logout worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'logout', loading: false}));
  }
}
