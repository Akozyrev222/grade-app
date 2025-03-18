import {authSelectors} from '@/bus/auth';
import React, {FC} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {useSelector} from 'react-redux';

type TProps = TouchableOpacityProps & {
  needBeLogged?: boolean;
  setIsOpened?: () => any;
};

export const TabBarButton: FC<TProps> = ({
  children,
  needBeLogged,
  setIsOpened,
  ...props
}) => {
  const token = useSelector(authSelectors.getToken);

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.6}
      onPress={(e) => {
        if (needBeLogged && !token) {
          setIsOpened();
        } else {
          props.onPress(e);
        }
      }}>
      {children}
    </TouchableOpacity>
  );
};
