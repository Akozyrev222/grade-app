import React, {FC} from 'react';

import {Path, Svg, SvgProps} from 'react-native-svg';

type TProps = SvgProps & {
  size: number;
  fill: string;
};

export const CheckMark: FC<TProps> = ({size, fill, ...props}) => {
  return (
    <Svg {...props} width={size} height={size} viewBox="0 0 18 12" fill="none">
      <Path
        d="M7.42113 11.4139C7.02788 11.8071 6.38931 11.804 5.99996 11.4068L0.699836 6.00082C0.313288 5.60655 0.319574 4.97347 0.713711 4.58678C1.10807 4.19988 1.7416 4.20594 2.12832 4.60048L6.01396 8.56467C6.4033 8.96188 7.04193 8.96507 7.43522 8.57178L15.3 0.707C15.6905 0.316535 16.3235 0.316534 16.714 0.706999C17.1045 1.09746 17.1045 1.73053 16.714 2.121L7.42113 11.4139Z"
        fill={fill}
      />
    </Svg>
  );
};
