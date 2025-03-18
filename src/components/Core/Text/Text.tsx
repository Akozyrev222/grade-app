import {Fonts, TextColors} from '@/themes';
import React, {FC, useMemo} from 'react';

import {Text as TextNative, TextProps} from 'react-native';
import {useStyles} from './useStyles';

type TProps = TextProps & {
  children: any;
  line?: number;
  family?: keyof typeof Fonts;
  color?: keyof TextColors;
  size?: number;
  align?: 'center' | 'right' | 'left';
  margin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
};

export const Text: FC<TProps> = ({
  children,
  color = 'default',
  size = 14,
  family = 'regular',
  line,
  margin,
  align = 'left',
  ...props
}) => {
  const {styles} = useStyles({color, family, size});

  const marginData = useMemo(
    () => ({
      marginBottom: margin?.bottom,
      marginTop: margin?.top,
      marginLeft: margin?.left,
      marginRight: margin?.right,
    }),
    [margin],
  );

  return (
    <TextNative
      {...props}
      style={[
        styles.text,
        !!line && {lineHeight: line},
        marginData,
        {textAlign: align},
        props.style,
      ]}>
      {children}
    </TextNative>
  );
};
