import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          backgroundColor: pallete.background.blur,
          minHeight: 48,

          borderRadius: 8,

          paddingHorizontal: 8,

          borderWidth: 1,
        },

        content: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 12,
          minHeight: 48,
        },
      }),
    [pallete],
  );

  return {
    styles,
    iconColor: pallete.icon.default as string,
    borders: pallete.input.border,
  };
};
