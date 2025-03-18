import React, {FC, ReactNode} from 'react';

import LinearGradient from 'react-native-linear-gradient';

type TProps = {
  children: ReactNode | ReactNode[];
};

export const GradientLayout: FC<TProps> = ({children}) => {
  return (
    <LinearGradient style={{flex: 1}} colors={['#5FE6DF', '#B491CA']}>
      {children}
    </LinearGradient>
  );
};
