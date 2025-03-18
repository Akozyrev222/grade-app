import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyles = () => {
  const {pallete} = useTheme();
  const insets = useSafeAreaInsets();

  const headerStyles = useMemo(
    () =>
      Platform.OS === 'ios'
        ? {}
        : {
            height: 100,
          },
    [insets],
  );
  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          ...headerStyles,
        },
        container: {
          marginTop: 16,
          paddingHorizontal: 16,
          flex: 1,
        },
        specialization: {
          backgroundColor: pallete.background.gray,
          marginTop: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 12,
          minHeight: 48,
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.default as string};
};
