import {AxiosPromise} from 'axios';
import {User} from '.';

import axios from '@/services/axios';

export const apiUser = new (class Api {
  fetchDetail(token?: string | null): AxiosPromise<User.ResFetchDetail> {
    return axios({
      url: '/user_info',
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateDetail(data: User.ReqUpdateDetail): AxiosPromise<User.ReqUpdateDetail> {
    const fd = new FormData();

    delete data.specialities;

    for (let key in data) {
      if (key === 'tags' || key === 'speciality') continue;

      if (key === 'phone' || key === 'full_name') {
        if (!data[key].isSkip) {
          fd.append(`user[${key}]`, data[key].value);
        }
        continue;
      }

      if (key === 'avatar') {
        if (data[key] && !data[key]?.isOld) {
          fd.append(`user[${key}]`, data[key]);
        }
        continue;
      }

      if (key === 'executor_attributes') {
        for (let j in data[key]) {
          if (j === 'tags_array') {
            data[key][j].forEach((item) => {
              fd.append(`user[${key}][${j}][]`, item);
            });

            continue;
          }
          if (j === 'id') {
            fd.append(`user[${key}][${j}]`, data[key][j]);
            continue;
          }

          if (j === 'speciality_ids') {
            if (data[key][j].length) {
              data[key][j].forEach((item) => {
                fd.append(`user[${key}][${j}][]`, item);
              });
            } else {
              fd.append(`user[${key}][speciality_ids][]`, '');
            }
            continue;
          }
        }

        continue;
      }

      if (key === 'phones_attributes') {
        data[key].forEach((phone) => {
          if (phone?._destroy) {
            fd.append(`user[phones_attributes[][id]]`, phone.id);
            fd.append(`user[phones_attributes[][_destroy]]`, true);
          } else {
            if (phone?.id) {
              fd.append(`user[phones_attributes[][id]]`, phone.id);
              fd.append(`user[phones_attributes[][value]]`, phone.value);
            } else {
              fd.append(`user[phones_attributes[][value]]`, phone.value);
            }
          }
        });
        continue;
      }

      fd.append(`user[${key}]`, data[key]);
    }
    return axios({
      url: '/update_user',
      method: 'put',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: fd,
    });
  }

  confirmPhone(user: User.ReqConfirmPhone): AxiosPromise<User.ResConfirmPhone> {
    return axios({
      url: '/update_phone',
      method: 'post',
      data: {user},
    });
  }

  verificate(data: User.ReqVerificate): AxiosPromise<User.ResVerificate> {
    return axios({
      url: '/verifications',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    });
  }

  updateDeviceToken(
    data: User.ReqUpdateDeviceToken,
    token: string,
  ): AxiosPromise {
    return axios({
      url: '/update_token',
      method: 'put',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  removeDetail(): AxiosPromise {
    return axios({
      url: '/deleted_user',
      method: 'delete',
    });
  }

  createExecutor(data: User.ReqCreateExecutor, token: string): AxiosPromise {
    return axios({
      url: '/update_user',
      method: 'put',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createPromoCode(data: User.PromoCode): AxiosPromise {
    return axios({
      url: '/use_promo_code',
      method: 'post',
      data,
    });
  }
})();
