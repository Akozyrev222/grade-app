import {SagaIterator} from 'redux-saga';
import {all, call, takeEvery} from 'redux-saga/effects';
import {types} from '../types';
import {
  processMessage,
  processOnline,
  processRemove,
  processRoom,
} from './workers';

function* watchProcessMessage(): SagaIterator {
  yield takeEvery(types.PROCESS_MESSAGE, processMessage);
}

function* watchProcessRoom(): SagaIterator {
  yield takeEvery(types.PROCESS_ROOM, processRoom);
}

function* watchProcessOnline(): SagaIterator {
  yield takeEvery(types.PROCESS_ONLINE, processOnline);
}

function* watchProcessRemove(): SagaIterator {
  yield takeEvery(types.PROCESS_REMOVE, processRemove);
}

export function* watchSocket(): SagaIterator {
  yield all([
    call(watchProcessMessage),
    call(watchProcessRoom),
    call(watchProcessOnline),
    call(watchProcessRemove),
  ]);
}
