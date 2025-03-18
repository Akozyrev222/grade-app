import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          position: 'absolute',

          top: '47%',
          // left: 16,

          justifyContent: 'center',
          alignSelf: 'center',
        },
        static: {
          position: 'relative',
          top: 0,
        },

        button: {
          borderRadius: 100,

          height: 50,
          width: 50,

          backgroundColor: pallete.background.dark,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.light as string};
};
