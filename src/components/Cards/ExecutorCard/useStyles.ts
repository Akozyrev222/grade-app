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

          height: 88,

          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',

          borderRadius: 8,

          marginBottom: 12,
          padding: 12,

          position: 'relative',
        },

        top: {
          position: 'absolute',
          left: 0,
          top: 0,

          width: 40,
          height: 20,

          backgroundColor: pallete.background.action,

          zIndex: 2,

          borderRadius: 8,
          borderTopRightRadius: 0,

          justifyContent: 'center',
          alignItems: 'center',
        },

        info: {
          flex: 1,

          marginLeft: 12,

          justifyContent: 'space-between',
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },

        footer: {
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',

          marginTop: 8,
        },
      }),
    [pallete],
  );

  return {
    styles,
  };
};
