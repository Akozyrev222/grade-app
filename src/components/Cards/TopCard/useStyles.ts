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
          justifyContent: 'space-between',

          height: 32,

          paddingHorizontal: 16,

          marginBottom: 8,
        },
        button: {
          width: 80,
          height: 32,
          borderRadius: 9,
        },
        row: {
          flexDirection: 'row',
        },
      }),
    [pallete],
  );

  return {styles};
};
