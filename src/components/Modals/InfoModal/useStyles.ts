import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

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
          height: 232,

          backgroundColor: pallete.background.light,
          borderRadius: 8,
          padding: 24,

          justifyContent: 'space-between',
        },
        content: {
          flex: 1,

          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
    [pallete],
  );

  return {styles, color: pallete.icon.dark as string};
};
