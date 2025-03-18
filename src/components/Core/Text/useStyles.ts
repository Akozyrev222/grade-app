import {useTheme} from '@/hooks';
import {Fonts, TextColors} from '@/themes';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
type TArg = {
  family: keyof typeof Fonts;
  size: number;
  color: keyof TextColors;
};

export const useStyles = ({color, family, size}: TArg) => {
  const {pallete, fonts} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        text: {
          fontSize: size,
          color: pallete.text[color],
          fontFamily: fonts[family],
        },
      }),
    [pallete, color, size, family],
  );

  return {styles};
};
