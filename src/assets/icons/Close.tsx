import React, {FC} from 'react';

import {Path, Svg, SvgProps} from 'react-native-svg';

type TProps = SvgProps & {
  fill: string;
  size: number;

  isLight?: boolean;
};

export const Close: FC<TProps> = ({size, fill, isLight, ...props}) => {
  if (isLight) {
    return (
      <Svg width={size} height={size} viewBox="0 0 17 16" fill="none">
        <Path
          d="M1 1L16 15"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16 1L1 15"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  return (
    <Svg {...props} width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
        fill={fill}
      />
    </Svg>
  );
};
