import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

type TProps = {
  size: number;
};

export const DeIcon: FC<TProps> = ({size}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90" fill="none">
      <Path
        d="M0 67.0769C0 69.7087 1.05357 72.2327 2.92893 74.0936C4.8043 75.9545 7.34784 77 10 77H80C82.6522 77 85.1957 75.9545 87.0711 74.0936C88.9464 72.2327 90 69.7087 90 67.0769V57.1538H0V67.0769Z"
        fill="#FFCD05"
      />
      <Path d="M0 34.8269H90V57.1539H0V34.8269Z" fill="#ED1F24" />
      <Path
        d="M80 12.5H10C7.34784 12.5 4.8043 13.5455 2.92893 15.4064C1.05357 17.2673 0 19.7913 0 22.4231L0 34.8269H90V22.4231C90 19.7913 88.9464 17.2673 87.0711 15.4064C85.1957 13.5455 82.6522 12.5 80 12.5V12.5Z"
        fill="#141414"
      />
    </Svg>
  );
};
