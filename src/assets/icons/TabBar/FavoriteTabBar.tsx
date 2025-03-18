import React, {FC} from 'react';

import {G, Path, Rect, Svg, SvgProps} from 'react-native-svg';

type TProps = SvgProps & {
  fill: string;
  size: number;
  isFocused: boolean;
};

export const FavoriteTabBar: FC<TProps> = ({
  fill,
  size,
  isFocused,
  ...props
}) => {
  return (
    <Svg
      width={size * 1.13}
      height={size}
      viewBox="-2 0 94 93"
      fill={isFocused ? fill : 'none'}
      {...props}>
      <G>
        <G>
          <Path
            d="M 42.901 85.549 c 1.059 1.383 3.138 1.383 4.197 0 c 7.061 -9.223 28.773 -25.692 33.475 -30.82 c 12.568 -12.568 12.568 -32.946 0 -45.514 h 0 c -8.961 -8.961 -26.859 -7.239 -34.145 3.1 c -0.699 0.992 -2.158 0.992 -2.857 0 C 36.286 1.975 18.387 0.253 9.426 9.214 h 0 c -12.568 12.568 -12.568 32.946 0 45.514 C 14.128 59.857 35.84 76.325 42.901 85.549 z"
            strokeLinecap="round"
            strokeWidth={8}
            stroke={fill}
          />
        </G>
      </G>
    </Svg>
  );
};
