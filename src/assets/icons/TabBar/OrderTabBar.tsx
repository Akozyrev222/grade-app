import React, {FC} from 'react';

import {Circle, Line, Path, Svg, SvgProps} from 'react-native-svg';

type TProps = SvgProps & {
  size: number;
  fill: string;
  isFocused: boolean;
};

export const OrderTabBar: FC<TProps> = ({size, fill, isFocused, ...props}) => {
  if (isFocused) {
    return (
      <Svg
        {...props}
        width={size}
        height={size}
        viewBox="0 0 26 26"
        fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13ZM13 7C13.5523 7 14 7.44772 14 8V12H18C18.5523 12 19 12.4477 19 13C19 13.5523 18.5523 14 18 14H14V18C14 18.5523 13.5523 19 13 19C12.4477 19 12 18.5523 12 18V14H8C7.44771 14 7 13.5523 7 13C7 12.4477 7.44771 12 8 12H12V8C12 7.44772 12.4477 7 13 7Z"
          fill={fill}
        />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <Line
        x1="13"
        y1="8"
        x2="13"
        y2="18"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="18"
        y1="13"
        x2="8"
        y2="13"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="13" cy="13" r="12" stroke={fill} strokeWidth="2" />
    </Svg>
  );

  // return (
  //   <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" {...props}>
  //     <Circle cx="12.5" cy="12.5" r="11.5" stroke={fill} strokeWidth="2" />
  //     <Line
  //       x1="13"
  //       y1="8"
  //       x2="13"
  //       y2="17"
  //       stroke={fill}
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //     />
  //     <Line
  //       x1="17"
  //       y1="13"
  //       x2="8"
  //       y2="13"
  //       stroke={fill}
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //     />
  //   </Svg>
  // );
};
