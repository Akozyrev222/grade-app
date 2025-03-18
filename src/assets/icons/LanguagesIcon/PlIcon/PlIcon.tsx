import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

type TProps = {
  size: number;
};

export const PlIcon: FC<TProps> = ({size}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 65" fill="none">
      <Path
        d="M75.9375 0.0625H14.0625C4.74328 0.0625 0 7.33107 0 16.2969V32.5312H90V16.2969C90 7.33107 85.2567 0.0625 75.9375 0.0625Z"
        fill="#E6E7E8"
      />
      <Path
        d="M0 48.7656C0 57.7314 4.74328 65 14.0625 65H75.9375C85.2567 65 90 57.7314 90 48.7656V32.5312H0V48.7656Z"
        fill="#EC1C24"
      />
    </Svg>
  );
};
