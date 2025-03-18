import {TIcon} from '@/themes';
import React, {FC, ReactNode} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

type TProps = TouchableOpacityProps & {
  size: number;
  children?: ReactNode;
};

export const IconButton: FC<TProps> = ({children, size, ...props}) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          height: size,
          width: size,
          justifyContent: 'center',
          alignItems: 'center',
        },
        props.style,
      ]}
      activeOpacity={0.6}>
      {children}
    </TouchableOpacity>
  );
};
