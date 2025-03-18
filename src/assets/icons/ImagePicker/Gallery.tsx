import React, {FC} from 'react';

import {Path, Svg, SvgProps} from 'react-native-svg';

type TProps = SvgProps & {
  fill: string;
  size: number;
};

export const Gallery: FC<TProps> = ({size, fill, ...props}) => {
  return (
    <Svg {...props} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 4V16H8V4H20ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM11.5 11.67L13.19 13.93L15.67 10.83L19 15H9L11.5 11.67ZM2 6V20C2 21.1 2.9 22 4 22H18V20H4V6H2Z"
        fill={fill}
      />
    </Svg>
  );
};
