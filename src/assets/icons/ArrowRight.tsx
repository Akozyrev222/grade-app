import React, {FC} from 'react';
import {Path, Svg} from 'react-native-svg';

export const ArrowRight: FC = () => {
  return (
    <Svg width={8} height={15} fill="none">
      <Path
        d="m1 1.5 6 6-6 6"
        stroke="#1E2839"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
