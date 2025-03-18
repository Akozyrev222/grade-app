import React, {FC} from 'react';

import {Path, Svg, SvgProps} from 'react-native-svg';

type TProps = SvgProps & {
  size: number;
  fill: string;

  vertical?: boolean;
};

export const Chevron: FC<TProps> = ({
  fill,
  size,
  vertical = false,
  ...props
}) => {
  return (
    <Svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 8 14"
      fill="none"
      style={{
        transform: [{rotate: !vertical ? '0deg' : '90deg'}],
      }}>
      <Path
        d="M0.999999 1L7 7L1 13"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
