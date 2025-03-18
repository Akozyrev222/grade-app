import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyles = () => {
  const {pallete} = useTheme();

  const {top} = useSafeAreaInsets();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          justifyContent: 'center',
          flex: 1,

          paddingHorizontal: 16,
        },
        header: {
          marginTop: top,
        },
      }),
    [pallete],
  );

  return {styles};
};
