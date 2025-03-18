import {all, call} from 'redux-saga/effects';

//watchers
import {watchRole} from '@/bus/role/saga/watchers';
import {watchApp} from '@/bus/app/saga/watchers';
import {watchFilter} from '@/bus/filter/saga/watchers';
import {watchAuth} from '@/bus/auth/saga/watchers';
import {watchUser} from '@/bus/user/saga/watchers';
import {watchOrder} from '@/bus/order/saga/watchers';
import {watchCategory} from '@/bus/category/saga/watchers';
import {watchExecutor} from '@/bus/executor/saga/watchers';
import {watchApplication} from '@/bus/application/saga/watchers';
import {watchPayment} from '@/bus/payment/saga/watchers';
import {watchMessage} from '@/bus/message/saga/watchers';
import {watchRoom} from '@/bus/room/saga/watchers';
import {watchSocket} from '@/bus/socket/saga/watchers';
import {watchFavorite} from '@/bus/favorite/saga/watchers';
import {watchReport} from '@/bus/report/saga/watchers';
import {watchReview} from '@/bus/review/saga/watchers';
import {watchCurrencies} from '@/bus/currencies/saga/watchers';
import {watchReferrals} from '@/bus/referral_program/saga/watchers';
import {fetchList} from '@/bus/settings/saga/workers';
import {watchSettings} from '@/bus/settings/saga/watchers';
import {watchLink} from '@/bus/link/saga/watchers';

function* rootSaga() {
  try {
    yield all([
      call(watchRole),
      call(watchApp),
      call(watchFilter),
      call(watchAuth),
      call(watchUser),
      call(watchOrder),
      call(watchCategory),
      call(watchExecutor),
      call(watchApplication),
      call(watchPayment),
      call(watchMessage),
      call(watchRoom),
      call(watchSocket),
      call(watchFavorite),
      call(watchReport),
      call(watchReview),
      call(watchCurrencies),
      call(watchReferrals),
      call(watchSettings),
      call(watchLink),
    ]);
  } catch (error) {
    console.log('⛔️ error', error);
  }
}

export default rootSaga;
