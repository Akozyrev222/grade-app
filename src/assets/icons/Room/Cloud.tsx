import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

type TProps = {
  color: string;
  size: number;
  reverse?: boolean;
};

export const Cloud: FC<TProps> = ({color, size, reverse = false}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 7 10" fill="none">
      {reverse ? (
        <Path
          d="M6.99512 0.5L4.80449 4.88126C4.26925 5.95173 3.54621 6.91742 2.66975 7.73239L0.499927 9.75H6.99512V0.5Z"
          fill={color}
        />
      ) : (
        <Path
          d="M0.5 0.5L2.69063 4.88126C3.22586 5.95173 3.94891 6.91742 4.82537 7.73239L6.99519 9.75H0.5V0.5Z"
          fill={color}
        />
      )}
    </Svg>
  );
};
