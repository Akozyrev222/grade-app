import axios from '@/services/axios';
import {AxiosPromise} from 'axios';

import {Application} from './';

export const apiApplication = new (class Api {
  fetchExecutorItems(
    params: Application.ReqFetchItems,
  ): AxiosPromise<Application.ResFetchItems> {
    return axios({
      url: '/requests',
      method: 'get',
      params,
    });
  }

  fetchCustomerItems(
    params: Application.ReqFetchItems,
  ): AxiosPromise<Application.ResFetchItems> {
    return axios({
      url: '/reviews',
      method: 'get',
      params,
    });
  }

  createItem(
    data: Application.ReqCreateItem,
  ): AxiosPromise<Application.ResCreateItem> {
    const fd = new FormData();

    for (let key in data) {
      if (key === 'photo_attributes') {
        data[key].forEach((photo) => {
          fd.append(`request[request_photo_attributes][][photo]`, photo);
        });
        continue;
      }

      fd.append(`request[${key}]`, data[key]);
    }

    return axios({
      url: '/requests',
      method: 'post',
      data,
    });
  }

  confirmItem(data: Application.ReqConfirmItem): AxiosPromise {
    return axios({
      url: '/choice_executor',
      method: 'post',
      data,
    });
  }

  readItem(data: Application.ReqReadItem): AxiosPromise {
    return axios({
      url: '/read_request',
      method: 'post',
      data,
    });
  }
})();
