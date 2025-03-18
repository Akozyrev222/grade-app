import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          marginTop: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        button: {
          height: 29,
          width: '31%',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        },
        text: {
          color: pallete.text.default,
          fontWeight: '400',
          fontSize: 16,
        },
      }),
    [pallete],
  );

  return {styles};
};
