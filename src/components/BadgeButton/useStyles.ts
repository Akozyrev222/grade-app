import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          position: 'relative',
        },
        badge: {
          position: 'absolute',
          top: 2,
          right: 14,

          backgroundColor: pallete.background.action,

          height: 18,
          width: 18,

          justifyContent: 'center',
          alignItems: 'center',

          borderRadius: 18,
        },
      }),
    [pallete],
  );

  return {styles};
};
