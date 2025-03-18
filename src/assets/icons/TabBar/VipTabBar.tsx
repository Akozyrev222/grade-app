import React, {FC} from 'react';

import {Path, Svg, SvgProps} from 'react-native-svg';

type TProps = SvgProps & {
  fill: string;
  size: number;
  isFocused: boolean;
};

export const VipTabBar: FC<TProps> = ({size, fill, isFocused, ...props}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        d="M11 1L14.09 7.58254L21 8.64458L16 13.7655L17.18 21L11 17.5825L4.82 21L6 13.7655L1 8.64458L7.91 7.58254L11 1Z"
        stroke={fill}
        strokeWidth={1.5}
        fill={isFocused ? fill : 'none'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
