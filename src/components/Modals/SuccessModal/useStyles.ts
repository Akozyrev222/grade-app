import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          flex: 1,
          width: '100%',
          backgroundColor: '#00000040',

          justifyContent: 'center',
          alignItems: 'center',
        },
        wrapper: {
          width: Dimensions.get('window').width - 64,
          height: 145,

          backgroundColor: pallete.background.light,
          borderRadius: 8,
          padding: 20,

          justifyContent: 'space-between',
        },
        content: {
          flex: 1,

          alignItems: 'center',
          justifyContent: 'center',
        },
        footer: {
          flexDirection: 'row',

          justifyContent: 'space-between',
        },

        button: {
          width: '100%',
        },
      }),
    [pallete],
  );

  return {styles};
};
