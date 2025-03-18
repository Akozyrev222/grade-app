import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

type TProps = {
  size: number;
  color: string;
};

export const EmptyIcon: FC<TProps> = ({color, size}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 65 45" fill="none">
      <Path
        d="M0.666992 0V6.66667H40.667V0H0.666992ZM0.666992 13.3333V20H30.667V13.3333H0.666992ZM41.2337 15.8667L36.5337 20.5667L45.967 30L36.5337 39.4333L41.2337 44.1333L50.667 34.7L60.1003 44.1333L64.8003 39.4333L55.367 30L64.8003 20.5667L60.1003 15.8667L50.667 25.3L41.2337 15.8667ZM0.666992 26.6667V33.3333H30.667V26.6667H0.666992Z"
        fill={color}
        fill-opacity="0.7"
      />
    </Svg>
  );
};
