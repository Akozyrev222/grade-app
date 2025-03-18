import {StyleSheet} from 'react-native';
import {useTheme} from '@/hooks';
import {useMemo} from 'react';
export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        input: {
          color: pallete.text.default,
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.blur as string};
};
