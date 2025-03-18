import {useTheme} from '@/hooks';
import React, {FC} from 'react';
import {RefreshControl} from 'react-native';

type TProps = {
  refreshing: boolean;
  onRefresh: () => any;
};

export const Refresh: FC<TProps> = (props) => {
  const {pallete} = useTheme();

  return <RefreshControl {...props} tintColor={pallete.background.dark} />;
};
