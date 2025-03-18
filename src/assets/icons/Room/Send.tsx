import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

type TProps = {
  color: string;
  size: number;
};

export const Send: FC<TProps> = ({size, color}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.4392 13.1465L3.69193 10.8974C1.33872 10.113 0.162109 9.72076 0.162109 9C0.162109 8.27925 1.33872 7.88704 3.69193 7.10264L21.2051 1.26492C22.8609 0.712985 23.6888 0.437021 24.1258 0.874036C24.5628 1.31105 24.2869 2.13895 23.7349 3.79474L17.8972 21.3079C17.1128 23.6611 16.7206 24.8377 15.9998 24.8377C15.2791 24.8377 14.8869 23.6611 14.1025 21.3079L11.8534 14.5607L18.2069 8.20711C18.5975 7.81659 18.5975 7.18342 18.2069 6.7929C17.8164 6.40237 17.1832 6.40237 16.7927 6.7929L10.4392 13.1465Z"
        fill={color}
      />
    </Svg>
  );
};
