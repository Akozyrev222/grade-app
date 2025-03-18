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

          paddingHorizontal: 16,

          backgroundColor: pallete.background.blur,

          marginTop: 8,

          height: 56,

          borderRadius: 8,
        },

        counter: {
          justifyContent: 'center',
          alignItems: 'center',

          backgroundColor: pallete.background.dark,

          height: 42,
          width: 42,

          borderRadius: 4,
        },
      }),
    [pallete],
  );

  return {styles};
};
