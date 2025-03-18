import {VIP} from '@/constants';

export const extractVipName = (value: number): keyof typeof VIP => {
  for (let key in VIP) {
    if (value <= VIP[key]) {
      return key as keyof typeof VIP;
    }
  }

  return 'default';
};
