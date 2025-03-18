import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          height: 48,

          marginBottom: 16,

          backgroundColor: pallete.background.light_gray,

          borderRadius: 8,

          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
      }),
    [pallete],
  );

  return {styles};
};
