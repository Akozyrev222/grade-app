import {CheckMark} from '@/assets';
import React, {FC, useEffect, useMemo} from 'react';

import {Animated, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {Text} from '../Text';
import {useStyles} from './useStyles';

type TProps = TouchableOpacityProps & {
  label?: string;
  value: boolean;
  onCheck: (value: boolean) => any;
  margin?: {
    right?: number;
    bottom?: number;
    top?: number;
    left?: number;
  };
};

export const Checkbox: FC<TProps> = ({
  label,
  value,
  onCheck,
  margin,
  ...props
}) => {
  const {styles, light, transparent, iconColor} = useStyles();

  const checked = useMemo(() => new Animated.Value(0), []);
  const margins = useMemo(
    () => ({
      marginTop: margin?.top || 0,
      marginBottom: margin?.bottom || 0,
      marginLeft: margin?.left || 0,
      marginRight: margin?.right || 0,
    }),
    [margin],
  );
  useEffect(() => {
    if (value) {
      Animated.timing(checked, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(checked, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [value, checked]);

  const backgroundColor = useMemo(() => {
    return checked.interpolate({
      inputRange: [0, 1],
      outputRange: [transparent, light],
    });
  }, [checked, value]);
  const borderColor = useMemo(() => {
    return checked.interpolate({
      inputRange: [0, 1],
      outputRange: [light, transparent],
    });
  }, [checked, value]);
  return (
    <TouchableOpacity
      activeOpacity={1}
      {...props}
      style={[styles.wrapper, margins, props.style]}
      onPress={() => onCheck(!value)}>
      <Animated.View style={[styles.square, {backgroundColor, borderColor}]}>
        {value && <CheckMark fill={iconColor} size={18} />}
      </Animated.View>

      {!!label && (
        <Text family="medium" size={14} margin={{left: 8}}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
