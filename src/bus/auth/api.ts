import AsyncStorage from '@react-native-community/async-storage';
import {AxiosPromise, AxiosResponse} from 'axios';
import {Auth} from './namespace';

import axios from '@/services/axios';
import {sha256} from 'react-native-sha256';
const ke = 'fbf80b4b2174fc988168b2b4600a1b74';

export const apiAuth = new (class Api {
  saveToken(token: string | null): Promise<boolean> {
    return new Promise(async (res, rej) => {
      try {
        await AsyncStorage.setItem('TOKEN', `${token}`);

        res(true);
      } catch (e) {
        console.log(`error save token action ${e}`);

        rej(false);
      }
    });
  }

  fetchToken(): Promise<string | null> {
    return new Promise(async (res, rej) => {
      try {
        const token = (await AsyncStorage.getItem('TOKEN')) || null;
        res(token);
      } catch (e) {
        console.log(`error fetch token action ${e}`);
      }
    });
  }

  signUp({user}: Auth.ReqSignUp, token: string): AxiosPromise<Auth.ResSignUp> {
    const data = new FormData();
    for (let key in user) {
      if (user[key] === null) continue;
      if (key === 'phones_attributes') {
        user[key].forEach(({value}) => {
          data.append(`user[${key}][][value]`, value);
        });

        continue;
      }

      if (key === 'executor_attributes') {
        for (let j in user[key]) {
          if (j === 'tags_array') {
            user[key][j].forEach((tag) => {
              data.append(`user[${key}][${j}][]`, tag);
            });

            continue;
          }

          if (j === 'speciality_ids') {
            user[key][j].forEach((tag) => {
              data.append(`user[${key}][${j}][]`, tag);
            });

            continue;
          }

          data.append(`user[${key}][${j}]`, user[key][j]);
        }

        continue;
      }

      data.append(`user[${key}]`, user[key]);
    }

    const dataUSEW = axios({
      url: '/sign_up',
      method: 'post',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return dataUSEW;
  }

  async sendCode(
    data: Auth.ReqSendCode,
  ): Promise<AxiosResponse<Auth.ReqSendCode>> {
    const value = ke + `${data.phone.code} ${data.phone.value}`;
    return axios({
      url: '/send_sms',
      method: 'post',
      headers: {
        key: await sha256(value),
      },
      data: {
        user: {
          phone: `${data.phone.code} ${data.phone.value}`,
        },
        referral_code: data.referral_code,
      },
    });
  }
  confirmCode(data: Auth.ReqConfirmCode): AxiosPromise<Auth.ResConfirmCode> {
    return axios({
      url: '/sign_in',
      method: 'post',
      data: {
        user: data,
      },
    });
  }
  logout(): AxiosPromise {
    return axios({
      url: '/sign_out',
      method: 'delete',
    });
  }
  socialNetworksLogin(data: Auth.ReqSocialNetworksLogin): AxiosPromise {
    return axios({
      url: '/users/oauth_login',
      method: 'post',
      data: data,
    });
  }
})();
