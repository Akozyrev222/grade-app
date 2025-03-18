import {useMemo} from 'react';
import {useTheme} from '@/hooks';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        btn: {
          backgroundColor: pallete.background.blur,
          borderRadius: 10,
          height: 47,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 25,
          marginBottom: 10,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        text: {
          marginLeft: 15,
        },
      }),
    [pallete],
  );

  return styles;
};
