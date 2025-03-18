import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

type TProps = {
  size: number;
};

export const UkIcon: FC<TProps> = ({size}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90" fill="none">
      <Path
        d="M80 12.5H10C7.34784 12.5 4.8043 13.5536 2.92893 15.4289C1.05357 17.3043 0 19.8478 0 22.5L0 45H90V22.5C90 19.8478 88.9464 17.3043 87.0711 15.4289C85.1957 13.5536 82.6522 12.5 80 12.5Z"
        fill="#005BBB"
      />
      <Path
        d="M90 67.5C90 70.1522 88.9464 72.6957 87.0711 74.5711C85.1957 76.4464 82.6522 77.5 80 77.5H10C7.34784 77.5 4.8043 76.4464 2.92893 74.5711C1.05357 72.6957 0 70.1522 0 67.5V45H90V67.5Z"
        fill="#FFD500"
      />
    </Svg>
  );
};
