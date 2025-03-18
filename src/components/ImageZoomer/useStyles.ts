import {Dimensions, StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useTheme} from '@/hooks/useTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
export const useStyles = () => {
  const {pallete} = useTheme();

  const insets = useSafeAreaInsets();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          marginTop: insets.top,
          paddingHorizontal: 16,

          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',

          width: Dimensions.get('screen').width,
        },

        closeWrapper: {
          backgroundColor: pallete.background.light,

          justifyContent: 'center',
          alignItems: 'center',

          height: 28,
          width: 28,

          borderRadius: 28,
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.default as string};
};
