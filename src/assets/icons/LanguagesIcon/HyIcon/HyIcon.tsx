import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

type TProps = {
  size: number;
};

export const HyIcon: FC<TProps> = ({size}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet">
      <Path fill="#D90012" d="M32 5H4a4 4 0 0 0-4 4v4h36V9a4 4 0 0 0-4-4z" />
      <Path fill="#F2A800" d="M4 31h28a4 4 0 0 0 4-4v-4H0v4a4 4 0 0 0 4 4z" />
      <Path fill="#0033A0" d="M0 13h36v10H0z" />
    </Svg>
  );
};
