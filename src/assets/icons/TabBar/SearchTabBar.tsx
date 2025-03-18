import React, {FC} from 'react';

import {Path, Svg, SvgProps} from 'react-native-svg';

type TProps = SvgProps & {
  size: number;
  fill: string;
  isFocused: boolean;
};

export const SearchTabBar: FC<TProps> = ({size, fill, isFocused, ...props}) => {
  return (
    <Svg {...props} width={size} height={size} viewBox="-1 0 22 21" fill="none">
      <Path
        d="M9 18C13.4183 18 17 14.1944 17 9.5C17 4.80558 13.4183 1 9 1C4.58172 1 1 4.80558 1 9.5C1 14.1944 4.58172 18 9 18Z"
        stroke={fill}
        strokeWidth={isFocused ? 3 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 20L15 15"
        stroke={fill}
        strokeWidth={isFocused ? 3 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
