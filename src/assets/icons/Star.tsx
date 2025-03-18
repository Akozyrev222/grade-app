import React, {FC} from 'react';

import {
  Circle,
  ClipPath,
  Path,
  Rect,
  Svg,
  SvgProps,
  Use,
} from 'react-native-svg';

type TProps = SvgProps & {
  fill: string;
  size: number;
};

export const Star: FC<TProps> = ({size, fill, ...props}) => {
  return (
    <Svg {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        clip-path="url(#myClip)"
        id="star"
        d="M8.00016 1.33334L10.0602 5.50668L14.6668 6.18001L11.3335 9.42668L12.1202 14.0133L8.00016 11.8467L3.88016 14.0133L4.66683 9.42668L1.3335 6.18001L5.94016 5.50668L8.00016 1.33334Z"
        fill={fill}
      />
    </Svg>
  );
};
