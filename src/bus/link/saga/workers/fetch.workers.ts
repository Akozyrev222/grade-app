import {SagaIterator} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {apiLink} from '../../api';
import {Link} from '../../namespace';
import {linkActions} from '../../slice';
import {types} from '../../types';

export function* fetchItem(): SagaIterator {
  try {
    const response: Link.Item = yield call(apiLink.fetchItem);
    if (response) {
      yield put(linkActions.saveLink(response));
    }
  } catch (e) {
    console.log(`error fetch link item worker ${e} `);
  } finally {
    yield put({type: types.END_FETCH_ITEM});
  }
}
