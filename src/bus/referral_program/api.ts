import axios from '@/services/axios';
import {AxiosPromise} from 'axios';
import {ReferralProgramResponse} from '@/bus/referral_program/types';

export const apiReferrals = new (class Api {
  fetchReferrals(): AxiosPromise<ReferralProgramResponse> {
    return axios({
      url: '/referral_programs',
      method: 'get',
    });
  }

  activateReferralProgram(data: {id: string}): AxiosPromise {
    return axios({
      url: '/use_referral_program',
      method: 'post',
      data,
    });
  }
})();
