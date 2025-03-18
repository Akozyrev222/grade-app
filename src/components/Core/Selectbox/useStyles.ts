import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {Background} from '@/themes/palletes/types';

export const useStyles = (color: keyof Background) => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          backgroundColor: pallete.background[color],
          borderRadius: 8,
          paddingHorizontal: 8,

          overflow: 'hidden',
        },
        item: {
          height: 48,

          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        },
      }),
    [pallete, color],
  );

  return {styles, iconColor: pallete.icon.default as string};
};
