import React, {FC} from 'react';

import {Path, Svg, SvgProps} from 'react-native-svg';

type TProps = SvgProps & {
  size: number;
  fill: string;
  isFocused: boolean;
};

export const ProfileTabBar: FC<TProps> = ({
  size,
  fill,
  isFocused,
  ...props
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 27 21"
      fill="none"
      {...props}
      style={{marginBottom: 4}}>
      <Path
        d="M23.7273 1H3.27273C2.01753 1 1 2.06332 1 3.375V17.625C1 18.9367 2.01753 20 3.27273 20H23.7273C24.9825 20 26 18.9367 26 17.625V3.375C26 2.06332 24.9825 1 23.7273 1Z"
        stroke={fill}
        fill={isFocused ? fill : 'none'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fill={isFocused ? fill : 'none'}
        d="M4.40918 6.58826L14.6365 6.58826"
        stroke={isFocused ? '#C0AAD5' : fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fill={isFocused ? fill : 'none'}
        d="M4.40918 9.94116L14.6365 9.94116"
        stroke={isFocused ? '#C0AAD5' : fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fill={isFocused ? fill : 'none'}
        d="M4.40918 14.4117L14.6365 14.4117"
        stroke={isFocused ? '#C0AAD5' : fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
