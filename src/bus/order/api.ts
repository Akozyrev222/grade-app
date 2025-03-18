import {clearObject} from './../../helpers/clearObject';
import {Order} from '@/bus/order';
import axios from '@/services/axios';
import {AxiosPromise} from 'axios';
import {App} from '../app';
import Geolocation from '@react-native-community/geolocation';

export const apiOrder = new (class Api {
  fetchMyItems(
    params: Order.FetchItemsParams,
  ): AxiosPromise<Order.ResFetchMyItems> {
    return axios({
      url: '/my_orders',
      method: 'get',
      params,
    });
  }

  fetchLocation(): Promise<App.Location> {
    return new Promise((res, rej) => {
      Geolocation.getCurrentPosition(
        async (position) => {
          res({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (e) => {
          res(null);
        },
        {timeout: 30000},
      );
    });
  }

  fetchItems(
    params: Order.FetchItemsParams,
  ): AxiosPromise<Order.ResFetchItems> {
    const newParams = clearObject({
      obj: params,
      callback: (item) => {
        if (item) {
          if (Array.isArray(item)) {
            if (item.length) {
              return true;
            }

            return false;
          }
          return true;
        }
        return false;
      },
    });

    return axios({
      url: '/orders',
      method: 'get',
      params: newParams,
    });
  }

  fetchDetail(
    params: Order.ReqFetchDetail,
  ): AxiosPromise<Order.ResFetchDetail> {
    const newParams = clearObject({
      obj: params,
      callback: (item) => {
        if (item) {
          if (Array.isArray(item)) {
            if (item.length) {
              return true;
            }

            return false;
          }
          return true;
        }
        return false;
      },
    });
    return axios({
      url: `/orders/${params.id}`,
      method: 'get',
      params: newParams,
    });
  }

  fetchDetailUser({
    id,
  }: Order.ReqFetchDetailUser): AxiosPromise<Order.ResFetchDetailUser> {
    return axios({
      url: `/user/${id}`,
      method: 'get',
    });
  }

  createItem(data: Order.ReqCreateItem): AxiosPromise {
    const fd = new FormData();

    for (let key in data) {
      if (key === 'order_photos_attributes') {
        data[key].forEach((photo) => {
          fd.append(`order[${key}][][photo]`, photo);
        });
        continue;
      }

      if (key === 'tags_array') {
        data[key].forEach((tag) => {
          fd.append(`order[${key}][]`, tag.name);
        });
        continue;
      }

      if (key === 'price' && (data.contract_price || !data[key])) {
        fd.append(`order[${key}]`, 0);

        continue;
      }

      if (key === 'distance_id') {
        fd.append(`order[${key}]`, data[key].id);
        continue;
      }

      fd.append(`order[${key}]`, data[key]);
    }

    return axios({
      url: '/orders',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: fd,
    });
  }

  updateItem(data: Order.ReqUpdateItem): AxiosPromise {
    const fd = new FormData();

    for (let key in data) {
      if (key === 'order_photos_attributes') {
        let destroyIndex = 0;
        data[key].forEach((photo) => {
          if (photo._destroy) {
            const img = photo as Order.Photo;

            fd.append(`order[${key}][${destroyIndex}][id]`, img.id);
            fd.append(`order[${key}][${destroyIndex}][_destroy]`, true);
            destroyIndex++;
          } else {
            const img = photo as Order.Photo;

            if (!img.id) {
              fd.append(`order[${key}][${destroyIndex}][photo]`, photo);
              destroyIndex++;
            }
          }
        });
        continue;
      }

      if (key === 'id') {
        continue;
      }
      if (key === 'tags_array') {
        data[key].forEach((tag) => {
          if (!tag._destroy) {
            fd.append(`order[${key}][]`, tag.name);
          }
        });

        continue;
      }

      if (key === 'price' && (data.contract_price || !data[key])) {
        fd.append(`order[${key}]`, 0);
        continue;
      }

      if (key === 'distance_id') {
        fd.append(`order[${key}]`, data[key].id);
        continue;
      }

      fd.append(`order[${key}]`, data[key]);
    }

    return axios({
      url: `/orders/${data.id}`,
      method: 'put',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: fd,
    });
  }

  removeItem({id}: Order.ReqRemoveItem): AxiosPromise {
    return axios({
      url: `/orders/${id}`,
      method: 'delete',
    });
  }
})();
