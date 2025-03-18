import React, {FC} from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type TProps = {
  size: number;
};

export const FrIcon: FC<TProps> = ({size}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90" fill="none">
      <G clipPath="url(#clip0_194_10318)">
        <Path
          d="M90 71.6667C90 74.3189 88.9464 76.8624 87.0711 78.7378C85.1957 80.6131 82.6522 81.6667 80 81.6667H60V16.6667H80C82.6522 16.6667 85.1957 17.7203 87.0711 19.5956C88.9464 21.471 90 24.0145 90 26.6667V71.6667Z"
          fill="#ED2939"
        />
        <Path
          d="M10 16.6667C7.34784 16.6667 4.8043 17.7203 2.92893 19.5956C1.05357 21.471 0 24.0145 0 26.6667L0 71.6667C0 74.3189 1.05357 76.8624 2.92893 78.7378C4.8043 80.6131 7.34784 81.6667 10 81.6667H30V16.6667H10Z"
          fill="#002495"
        />
        <Path d="M30 16.6667H60V81.6667H30V16.6667Z" fill="#EEEEEE" />
      </G>
      <Defs>
        <ClipPath id="clip0_194_10318">
          <Rect y="16.6667" width="90" height="65" rx="14" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
