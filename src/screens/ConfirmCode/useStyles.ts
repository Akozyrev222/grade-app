import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StatusBar, StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          marginTop: StatusBar.currentHeight,
          paddingHorizontal: 16,

          justifyContent: 'center',

          flex: 1,
        },

        resend: {
          marginTop: 16,

          flexDirection: 'row',
          justifyContent: 'center',
        },

        codeInput: {
          marginTop: 100,

          marginBottom: 120,
          width: 124,
          alignSelf: 'center',
        },
      }),
    [],
  );

  return {styles};
};
