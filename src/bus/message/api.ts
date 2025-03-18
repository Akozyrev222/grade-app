import {AxiosPromise} from 'axios';
import axios from '@/services/axios';

import {Message} from './namespace';

export const apiMessage = new (class Api {
  createItem(data: Message.ReqCreateItem): AxiosPromise {
    const fd = new FormData();

    for (let key in data.message) {
      if (key === 'images') {
        data.message[key].forEach((image) => {
          fd.append(`message[message_images_attributes][][image]`, image);
        });

        continue;
      }

      fd.append(`message[${key}]`, data.message[key]);
    }

    fd.append('chat_id', data.chat_id);

    return axios({
      url: '/messages',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: fd,
    });
  }

  fetchItems(
    params: Message.ReqFetchItems,
  ): AxiosPromise<Message.ResFetchItems> {
    return axios({
      url: '/messages',
      method: 'get',
      params,
    });
  }
})();
