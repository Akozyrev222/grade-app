import axios from '@/services/axios';
import {AxiosPromise} from 'axios';
import {Payment} from './namespace';

export const apiPayment = new (class Api {
  createTopItem(data: Payment.ReqCreateTopItem): AxiosPromise {
    return axios({
      url: '/buy_top',
      method: 'post',
      data,
    });
  }

  createVipItem(data: Payment.ReqCreateVipItem): AxiosPromise {
    return axios({
      url: '/buy_vip',
      method: 'post',
      data,
    });
  }
})();
