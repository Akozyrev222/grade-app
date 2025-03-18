import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          backgroundColor: pallete.background.blur,

          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }),
    [pallete],
  );

  return {styles};
};
