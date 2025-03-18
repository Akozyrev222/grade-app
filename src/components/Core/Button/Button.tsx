import {Fonts} from '@/themes';
import {ButtonKeysIcon} from '@/themes/palletes/types';
import React, {FC, ReactNode, useMemo} from 'react';

import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  View,
  StyleProp,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {useStyles} from './useStyles';

type TProps = TouchableOpacityProps & {
  children: any;
  size?: 'small' | 'normal' | 'large' | 'extraLarge';
  color?: ButtonKeysIcon;
  weight?: keyof typeof Fonts;
  align?: 'center' | 'left' | 'right';
  rightIcon?: ReactNode;
  disable?: boolean;
  margin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  fz?: number;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
};

export const Button: FC<TProps> = ({
  children,
  size = 'normal',
  color = 'default',
  weight = 'regular',
  align = 'center',
  disable = false,
  rightIcon,
  margin,
  fz,
  textStyle,
  loading,
  ...props
}) => {
  const {styles} = useStyles({color, weight});

  const marginData = useMemo(
    () => ({
      marginBottom: margin?.bottom,
      marginTop: margin?.top,
      marginLeft: margin?.left,
      marginRight: margin?.right,
    }),
    [margin],
  );

  const height = useMemo(() => {
    switch (size) {
      case 'small':
        return 36;

      case 'normal':
        return 40;

      case 'large':
        return 48;

      case 'extraLarge':
        return 80;

      default:
        return 48;
    }
  }, [size]);

  const fontSize = useMemo(() => {
    switch (size) {
      case 'small':
        return 13;

      case 'normal':
        return 14;

      case 'large':
        return 15;

      case 'extraLarge':
        return 16;

      default:
        return 14;
    }
  }, [size]);

  return (
    <TouchableOpacity
      {...props}
      onPress={disable ? () => {} : props.onPress}
      activeOpacity={0.8}
      style={[styles.wrapper, {height}, marginData, props.style]}>
      {!loading && (
        <>
          <Text
            style={[
              styles.text,
              {textAlign: align},
              {fontSize: fz || fontSize},
              textStyle,
            ]}>
            {children}
          </Text>
          {rightIcon && (
            <View style={styles.rightIconWrapper}>{rightIcon}</View>
          )}
        </>
      )}
      {!!loading && <ActivityIndicator size={'small'} />}
    </TouchableOpacity>
  );
};
