import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          borderColor: pallete.border.light,
          backgroundColor: pallete.background.light,

          justifyContent: 'center',
          alignItems: 'center',
        },

        loader: {
          position: 'absolute',

          left: 0,
          top: 0,
          right: 0,
          bottom: 0,

          justifyContent: 'center',
          alignItems: 'center',

          zIndex: 2,
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.dark as string};
};
