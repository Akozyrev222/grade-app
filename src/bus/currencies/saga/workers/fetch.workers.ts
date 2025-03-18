import {put, call} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';
import {apiCurrencies} from '../../api';
import {AxiosResponse} from 'axios';
import {Currencies} from '../../namespace';
import {currenciesActions} from '../../slice';
import {FetchItemsAsync} from '../../types';

export function* fetchItems(action: FetchItemsAsync): SagaIterator {
  try {
    const response: AxiosResponse<Currencies.ResFetchItems> = yield call(
      apiCurrencies.fetchItems,
    );

    if (response.data) {
      yield put(currenciesActions.saveItems(response.data));
    }
  } catch (e) {
    console.log(`error fetch category items worker ${e}`);
  }
}
