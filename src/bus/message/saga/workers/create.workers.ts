import {all, put, call, select, take, takeEvery} from 'redux-saga/effects';
import {uiActions} from '@/bus/ui';
import {SagaIterator} from 'redux-saga';
import {CreateItemAsync, types} from '../../types';
import {Message} from '../../namespace';
import {messageActions} from '../../slice';
import {apiMessage} from '../../api';
import {AxiosResponse} from 'axios';
import {socketActions} from '@/bus/socket';
import {socketMessageTemplates} from '@/helpers';
import {User, userSelectors} from '@/bus/user';
import {roleSelectors} from '@/bus/role';
import {EVENTS, logEvent} from '@/hooks/useAppsFlyer';

export function* createItem(action: CreateItemAsync): SagaIterator {
  try {
    yield put(uiActions.toggleLoader({name: 'message', loading: true}));

    const id = -new Date().getMilliseconds();

    const user: User.Item = yield select(userSelectors.getDetail);

    const message: Message.Item = {
      id,
      created_at: new Date().toString(),
      message_images: action.payload.message.images.map((item) => ({
        id: item.uri,
        image: {
          url: item.uri,
        },
      })),
      text: action.payload.message.text,
      user_id: user.id,
      chat_id: 0,
      not_read: 0,
    };

    yield put(messageActions.createItem(message));

    if (action.payload.message.images.length) {
      const response: AxiosResponse<Message.ResCreateItem> = yield call(
        apiMessage.createItem,
        action.payload,
      );

      if (response.data) {
        yield put(
          messageActions.confirmItem({item: response.data.message, id}),
        );
      }
    } else {
      const role = yield select(roleSelectors.getRole);

      yield put(
        socketActions.saveEmitItem({
          event: 'create_message',
          data: socketMessageTemplates.generateMessage<
            Message.ReqCreateItem & {action: string}
          >(action.payload.chat_id, {
            ...action.payload,
            role,
            action: 'create_message',
            tmp_id: id,
            message: {
              text: action.payload.message.text,
            },
          }),
        }),
      );
    }

    logEvent(EVENTS.SEND_MESSAGE);
  } catch (e) {
    console.log(`error create message worker ${e}`);
  } finally {
    yield put(uiActions.toggleLoader({name: 'message', loading: false}));
  }
}
