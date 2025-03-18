import {TgIcon, ViberIcon} from '@/assets/icons/Messengers';
import {MESSENGERS} from '@/constants';
import {FC} from 'react';
import {Report} from '@/bus/report';

export const useData = () => {
  const socIcons: Record<Report.Messanger, FC> = {
    viber: ViberIcon,
    tg: TgIcon,
  };

  return {socIcons};
};
