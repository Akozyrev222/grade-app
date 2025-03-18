import React from 'react';

import {useTheme} from '@/hooks';
import {FC, ReactNode} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

type TProps = {
  children: ReactNode | ReactNode[];
};

export const LightLayout: FC<TProps> = ({children}) => {
  const {pallete} = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: pallete.background.light,
      }}>
      {children}
    </SafeAreaView>
  );
};
