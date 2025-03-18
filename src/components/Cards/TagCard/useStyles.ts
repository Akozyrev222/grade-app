import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          backgroundColor: pallete.background.light,
          minHeight: 26,

          alignItems: 'center',
          flexDirection: 'row',

          paddingHorizontal: 8,

          borderRadius: 4,

          marginRight: 4,
          marginBottom: 4,
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.gray as string};
};
