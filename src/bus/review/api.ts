import {AxiosPromise} from 'axios';
import axios from '@/services/axios';
import {Review} from './namespace';

export const apiReview = new (class Api {
  createItem(data: Review.ReqCreateItem): AxiosPromise {
    const fd = new FormData();

    for (let key in data) {
      if (!data[key]) {
        continue;
      }

      if (key === 'feedback_images_attributes') {
        data[key].forEach((image) => {
          fd.append(`feedback[${key}][][image]`, image);
        });

        continue;
      }

      fd.append(`feedback[${key}]`, data[key]);
    }

    return axios({
      url: '/feedbacks',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: fd,
    });
  }
})();
