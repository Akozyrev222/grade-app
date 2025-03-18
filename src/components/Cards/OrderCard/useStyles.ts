import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          minHeight: 80,

          backgroundColor: pallete.background.blur,
          borderRadius: 8,

          paddingVertical: 4,
          paddingHorizontal: 16,

          justifyContent: 'space-around',

          marginBottom: 8,
        },

        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      }),
    [pallete],
  );

  return {styles};
};
