import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

type TProps = {
  size: number;
};

export const RuIcon: FC<TProps> = ({size}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 64" fill="none">
      <Path d="M0 21.8594H90V42.2031H0V21.8594Z" fill="#1B75BB" />
      <Path
        d="M75.9375 0.0625H14.0625C4.74328 0.0625 0 7.21914 0 16.0469V21.8594H90V16.0469C90 7.21914 85.2567 0.0625 75.9375 0.0625Z"
        fill="#E6E7E8"
      />
      <Path
        d="M0 48.0156C0 56.8434 4.74328 64 14.0625 64H75.9375C85.2567 64 90 56.8434 90 48.0156V42.2031H0V48.0156Z"
        fill="#EC1C24"
      />
    </Svg>
  );
};
