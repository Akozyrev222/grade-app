import {AxiosPromise} from 'axios';
import axios from '@/services/axios';

import {Room} from './namespace';

export const apiRoom = new (class Api {
  fetchItems(params: Room.ReqFetchItems): AxiosPromise<Room.ResFetchItems> {
    return axios({
      url: '/chats',
      method: 'get',
      params,
    });
  }

  fetchDetail({id}: Room.ReqFetchDetail): AxiosPromise<Room.ResFetchDetail> {
    return axios({
      url: `/chats/${id}`,
      method: 'get',
    });
  }

  removeItem({id}: Room.ReqRemoveItem): AxiosPromise {
    return axios({
      url: `/chats/${id}`,
      method: 'delete',
    });
  }

  createItem(data: Room.ReqCreateItem): AxiosPromise<Room.ResCreateItem> {
    return axios({
      url: '/chats',
      method: 'post',
      data,
    });
  }
})();
