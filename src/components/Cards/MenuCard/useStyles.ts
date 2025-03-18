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
          justifyContent: 'space-between',
          alignItems: 'center',

          height: 48,

          borderRadius: 8,

          backgroundColor: pallete.background.blur,

          paddingHorizontal: 16,
          marginTop: 8,
        },
      }),
    [pallete],
  );

  return {
    styles,
    iconColor: pallete.icon.default as string,
  };
};
