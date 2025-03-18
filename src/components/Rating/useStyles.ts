import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      }),
    [pallete],
  );

  return {
    styles,
    filledColor: pallete.icon.default as string,
    voidColor: pallete.icon.gray as string,
  };
};
