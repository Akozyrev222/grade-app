import React, {FC} from 'react';

import {Path, Svg, SvgProps} from 'react-native-svg';

type TProps = SvgProps & {
  fill?: string;
  size?: number;
};

export const Apple: FC<TProps> = ({size, fill, ...props}) => {
  return (
    <Svg width={size} height={size} fill="none" {...props}>
      <Path
        fill="#17264B"
        d="M19.497 23.037c-1.357 1.267-2.838 1.067-4.264.467-1.51-.614-2.894-.64-4.487 0-1.993.826-3.046.586-4.236-.467C-.247 16.331.75 6.12 8.42 5.746c1.87.093 3.171.986 4.265 1.066 1.634-.32 3.198-1.24 4.943-1.12 2.09.16 3.669.96 4.707 2.4-4.32 2.493-3.295 7.973.665 9.506-.79 2-1.814 3.986-3.517 5.452l.014-.013Zm-6.95-17.371C12.338 2.693 14.844.24 17.724 0c.401 3.44-3.24 6-5.179 5.666Z"
      />
    </Svg>
  );
};
