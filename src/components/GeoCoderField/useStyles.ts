import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          overflow: 'hidden',
        },
        item: {
          height: 42,
          justifyContent: 'center',
          marginTop: 4,
        },
      }),
    [pallete],
  );

  return {styles};
};
