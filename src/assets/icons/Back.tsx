import React, {FC} from 'react';

import {Path, Svg, SvgProps} from 'react-native-svg';

type TProps = SvgProps & {
  size: number;
  fill: string;
};

export const Back: FC<TProps> = ({size, fill, ...props}) => {
  return (
    <Svg {...props} width={size} height={size} viewBox="0 0 8 14" fill="none">
      <Path
        d="M7 13L1 7L7 1"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
