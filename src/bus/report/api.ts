import {AxiosPromise} from 'axios';
import axios from '@/services/axios';
import {Report} from './namespace';

export const apiReport = new (class Api {
  createItem(data: Report.ReqCreateItem): AxiosPromise {
    const fd = new FormData();

    for (let key in data) {
      if (key === 'file') {
        if (data[key]) {
          fd.append(`report[${key}]`, {
            uri: data[key].uri,
            name: data[key].name,
            type: data[key].type,
          });
        }
        continue;
      }
      fd.append(`report[${key}]`, data[key]);
    }

    return axios({
      url: '/reports',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'post',
      data: fd,
    });
  }
})();
