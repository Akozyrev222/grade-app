import {useCallback, useMemo, useState} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

type TDirection = 'bottom' | 'top' | '';

export const useScrollDirection = () => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const onScrollStart = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      setStart(e.nativeEvent.contentOffset.y);
    },
    [],
  );
  const onScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrolled =
        e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height;

      if (scrolled === e.nativeEvent.contentSize.height) {
        setEnd(e.nativeEvent.contentOffset.y + 1);
      } else {
        setEnd(e.nativeEvent.contentOffset.y);
      }
    },
    [],
  );

  const direction: TDirection = useMemo(() => {
    if (end === start) {
      return '';
    }

    if (end >= start) {
      return 'bottom';
    }
    return 'top';
  }, [end, start]);

  return {direction, onScrollEnd, onScrollStart};
};
