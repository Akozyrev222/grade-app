import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        cell: {
          width: 26,
          borderBottomWidth: 2,
          borderBottomColor: pallete.border.default,
          textAlign: 'center',
          height: 30,
          // height: 60,
          // backgroundColor: '#000',
          paddingBottom: 4,

          justifyContent: 'center',
          alignItems: 'center',
        },
      }),
    [pallete],
  );

  return {styles};
};
