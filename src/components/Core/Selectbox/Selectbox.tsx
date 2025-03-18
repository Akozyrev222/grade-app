import {ArrowDown} from '@/assets';
import React, {FC, useCallback, useMemo, useState} from 'react';
import {
  Animated,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';
import {Text} from '../Text';
import {useStyles} from './useStyles';

import {Background} from '@/themes/palletes/types';

type TTranslatedItem = {
  id: string;
  name: string;
};

type TProps = ViewProps & {
  items?: string[];
  current: string;
  onSelect?: (item: string) => any;
  onSelectTranslated?: (item: TTranslatedItem) => any;
  margin?: {
    right?: number;
    bottom?: number;
    top?: number;
    left?: number;
  };
  translatedItems?: any[];
  color?: keyof Background;
  callback?: (item: TTranslatedItem) => any;
};

export const Selectbox: FC<TProps> = ({
  current,
  items = [],
  margin,
  onSelect = () => {},
  translatedItems,
  onSelectTranslated = () => {},
  color = 'blur',
  callback = () => {},
  ...props
}) => {
  const {styles, iconColor} = useStyles(color);

  const animated = useMemo(() => new Animated.Value(0), []);

  const [isOpened, setIsOpened] = useState(false);

  const margins = useMemo(
    () => ({
      marginTop: margin?.top || 0,
      marginBottom: margin?.bottom || 0,
      marginLeft: margin?.left || 0,
      marginRight: margin?.right || 0,
    }),
    [margin],
  );
  const height = useMemo(() => {
    if (translatedItems) {
      return animated.interpolate({
        inputRange: [0, 1],
        outputRange: [48, translatedItems.length * 48],
      });
    }

    return animated.interpolate({
      inputRange: [0, 1],
      outputRange: [48, items.length * 48],
    });
  }, [animated, translatedItems]);

  const onShow = useCallback(() => {
    Animated.timing(animated, {
      toValue: 1,
      useNativeDriver: false,
    }).start();

    setIsOpened(true);
  }, [animated]);

  const onHide = useCallback(() => {
    Animated.timing(animated, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
    setIsOpened(false);
  }, [animated]);

  const renderItems = useMemo(() => {
    if (translatedItems) {
      return translatedItems.map(
        (item) =>
          item.name !== current && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onHide();
                onSelectTranslated(item);
              }}
              style={styles.item}
              key={`select-item-${item.id}`}>
              <Text family="medium">{item.name}</Text>
            </TouchableOpacity>
          ),
      );
    }

    return items.map(
      (item) =>
        item !== current && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onHide();
              onSelect(item);
            }}
            style={styles.item}
            key={`select-item-${item}`}>
            <Text family="medium">{item}</Text>
          </TouchableOpacity>
        ),
    );
  }, [translatedItems, items, current]);

  return (
    <Animated.View
      {...props}
      style={[styles.wrapper, {height}, margins, props.style]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (!+isOpened) {
            onShow();
          } else {
            onHide();
          }
        }}
        style={styles.item}>
        <Text family="medium" size={15}>
          {current}
        </Text>
        <ArrowDown size={22} fill={iconColor} />
      </TouchableOpacity>

      {renderItems}
    </Animated.View>
  );
};
