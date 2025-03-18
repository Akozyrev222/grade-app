import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyles = () => {
  const {pallete} = useTheme();
  const insets = useSafeAreaInsets();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          height: 95 + insets.top,
          
          paddingTop: insets.top,
          paddingHorizontal: 25,

          backgroundColor: pallete.background.blur,

          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        },

        backButton: {
          flexDirection: 'row',
          alignItems: 'center',
        },

        container: {
          flex: 1,

          paddingHorizontal: 16,
        },

        list: {
          paddingTop: 12,
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.default as string};
};
