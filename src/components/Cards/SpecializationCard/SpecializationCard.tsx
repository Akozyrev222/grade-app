import {Chevron} from '@/assets';
import {Text} from '@/components';
import {TextColors} from '@/themes';
import React, {FC, useEffect, useMemo} from 'react';

import {Animated, LayoutChangeEvent, TouchableOpacity} from 'react-native';
import {useStyles} from './useStyles';

type TProps = {
  name: string;
  onPress: () => any;
  color: keyof TextColors;
  error?: boolean;
  onLayout?: (e: LayoutChangeEvent) => any;
};

export const SpecializationCard: FC<TProps> = ({
  name,
  color,
  onPress,
  error,
  onLayout = () => {},
}) => {
  const {styles, iconColor, borders} = useStyles();

  const focused = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    if (error) {
      Animated.timing(focused, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(focused, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [error]);

  const borderColor = useMemo(() => {
    return focused.interpolate({
      inputRange: [0, 1],
      outputRange: [borders.light as string, borders.error as string],
    });
  }, [focused, focused, error]);

  return (
    <Animated.View style={[styles.wrapper, {borderColor}]} onLayout={onLayout}>
      <TouchableOpacity
        style={styles.content}
        onPress={onPress}
        activeOpacity={0.6}>
        <Text color={color}>{name}</Text>
        <Chevron size={14} fill={iconColor} />
      </TouchableOpacity>
    </Animated.View>
  );
};
