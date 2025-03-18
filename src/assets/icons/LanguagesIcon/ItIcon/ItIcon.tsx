import React, {FC} from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type TProps = {
  size: number;
};

export const ItIcon: FC<TProps> = ({size}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 65" fill="none">
      <G clipPath="url(#clip0_194_10333)">
        <Path
          d="M60.7373 -8.82376L60.8942 86.2252L90.4147 86.1113L90.2578 -8.93766L60.7373 -8.82376Z"
          fill="#ED1C24"
        />
        <Path
          d="M30.0411 -8.71876L-0.711914 -8.60542L-0.547699 86.4509L30.2053 86.3375L30.0411 -8.71876Z"
          fill="#009247"
        />
        <Path
          d="M60.8057 -8.83554L30.0527 -8.71689L30.2097 86.3394L60.9627 86.2208L60.8057 -8.83554Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_194_10333">
          <Rect width="90" height="64.8387" rx="15" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
