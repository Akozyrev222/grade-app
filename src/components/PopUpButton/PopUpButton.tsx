import React, {FC, useEffect, useMemo} from 'react';

import {Animated, StyleProp, TouchableOpacity, View} from 'react-native';
import {Filter} from '@/assets';

import {useStyles} from './useStyles';

type TProps = {
  onPress: () => any;
  icon?: 'filter';
  isShow: boolean;
  isStatic?: boolean;
  style?: StyleProp<any>;
};

export const PopUpButton: FC<TProps> = ({
  onPress,
  icon = 'filter',
  isShow,
  isStatic = false,
  style,
}) => {
  const {styles, iconColor} = useStyles();

  const show = useMemo(() => new Animated.Value(0), []);

  const renderIcon = useMemo(() => {
    switch (icon) {
      case 'filter':
        return <Filter fill={iconColor} size={18} />;

      default:
        return <Filter fill={iconColor} size={18} />;
    }
  }, [icon]);

  useEffect(() => {
    if (isShow) {
      Animated.timing(show, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(show, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  }, [isShow]);

  const right = useMemo(() => {
    return show.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-52, 32, 16],
    });
  }, [show]);

  return (
    <Animated.View
      style={[styles.wrapper, !isStatic ? {right} : styles.static, style]}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={onPress}>
        {renderIcon}
      </TouchableOpacity>
    </Animated.View>
  );
};
