import {uiActions} from '@/bus/ui';
import {goBack} from '@/navigation';
import {AxiosResponse} from 'axios';
import {SagaIterator} from 'redux-saga';
import {call, put, take} from 'redux-saga/effects';
import {apiUser} from '../../api';
import {User} from '../../namespace';
import {userActions} from '../../slice';
import {ConfirmPhoneAsync, types} from '../../types';

export function* confirmPhone(action: ConfirmPhoneAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'code', loading: true}));

    const response: AxiosResponse<User.ResConfirmPhone> = yield call(
      apiUser.confirmPhone,
      action.payload,
    );

    if (response.data.success) {
      yield put(userActions.fetchDetailAsync());

      yield take(types.END_FETCH_DETAIL);

      goBack();
    }
  } catch (e) {
    console.log(`error confirm phone worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'code', loading: false}));
  }
}
