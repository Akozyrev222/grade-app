import React, {FC} from 'react';

import {Path, Svg, SvgProps, Circle} from 'react-native-svg';

type TProps = SvgProps & {
  fill?: string;
  size?: number;
};

export const About: FC<TProps> = ({size, fill, ...props}) => {
  return (
    <Svg width={24} height={24} fill="none">
      <Circle cx={12} cy={12} r={9} stroke="#17264B" strokeWidth={1.5} />
      <Path d="M12.5 7.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" fill="#17264B" />
      <Path d="M12 17v-7" stroke="#17264B" strokeWidth={1.5} />
    </Svg>
  );
};
