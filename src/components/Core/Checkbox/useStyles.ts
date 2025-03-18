import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          flexDirection: 'row',

          alignItems: 'center',
        },
        square: {
          height: 24,
          width: 24,

          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }),
    [pallete],
  );

  return {
    styles,
    light: pallete.background.light as string,
    transparent: pallete.background.transparent as string,
    iconColor: pallete.icon.default as string,
  };
};
