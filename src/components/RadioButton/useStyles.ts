import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          width: 20,
          height: 20,
          backgroundColor: pallete.background.transparent,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: pallete.text.light_gray,
          marginRight: 20,
        },
        wrapperActiveRadioBtn: {
          borderColor: pallete.text.default,
        },
        radioBtn: {
          width: 10,
          height: 10,
          backgroundColor: pallete.text.light_gray,
          borderRadius: 50,
          margin: 3,
        },
        activeRadioBtn: {
          backgroundColor: pallete.text.default,
        },
      }),
    [pallete],
  );

  return {styles};
};
