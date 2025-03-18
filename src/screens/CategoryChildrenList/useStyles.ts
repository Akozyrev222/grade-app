import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StatusBar, StyleSheet, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyles = () => {
  const {pallete} = useTheme();

  const insets = useSafeAreaInsets();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          paddingHorizontal: 24,
          paddingTop:
            (StatusBar.currentHeight || 0) +
            (Platform.OS === 'ios' ? insets.top : 0),

          height: 138,

          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',

          backgroundColor: pallete.background.blur,
        },

        container: {
          paddingHorizontal: 24,

          flex: 1,
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.default as string};
};
