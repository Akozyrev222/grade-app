import React, {FC} from 'react';

import {Path, Svg, SvgProps} from 'react-native-svg';

type TProps = SvgProps & {
  fill?: string;
  size?: number;
};

export const Policy: FC<TProps> = ({size, fill, ...props}) => {
  return (
    <Svg width={24} height={24} fill="none">
      <Path
        d="m12.773 3.706 5.985 1.596a1 1 0 0 1 .742.966v6.02a6 6 0 0 1-2.672 4.993l-4.273 2.85a1 1 0 0 1-1.11 0l-4.273-2.85A6 6 0 0 1 4.5 12.29v-6.02a1 1 0 0 1 .742-.967l5.985-1.596a3 3 0 0 1 1.546 0Z"
        stroke="#17264B"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="m9.5 11.5 1.823 1.823a.25.25 0 0 0 .354 0L15 10"
        stroke="#17264B"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};
