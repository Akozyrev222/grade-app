import React, {FC} from 'react';

import {Svg, SvgProps, Path} from 'react-native-svg';

type TProps = SvgProps & {
  size: number;
  fill: string;
};

export const Plus: FC<TProps> = ({size, fill, ...props}) => {
  return (
    <Svg {...props} width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill={fill} />
    </Svg>
  );
};
