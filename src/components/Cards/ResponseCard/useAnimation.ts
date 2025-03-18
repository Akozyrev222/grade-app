import {useEffect, useMemo, useState} from 'react';
import {Animated} from 'react-native';

export const useAnimation = (
  fullHeight: number,
  initialIsOpened: boolean = false,
) => {
  const [isOpened, setIsOpened] = useState(initialIsOpened);

  const animated = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    if (isOpened) {
      Animated.timing(animated, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animated, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [animated, isOpened]);

  const height = useMemo(() => {
    return animated.interpolate({
      inputRange: [0, 1],
      outputRange: [88, fullHeight + 90],
    });
  }, [animated, fullHeight]);

  return {
    isOpened,
    setIsOpened,
    height,
  };
};
