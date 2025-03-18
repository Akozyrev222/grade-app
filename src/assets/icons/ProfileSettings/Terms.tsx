import React, {FC} from 'react';

import {Path, Svg, SvgProps} from 'react-native-svg';

type TProps = SvgProps & {
  fill?: string;
  size?: number;
};

export const Terms: FC<TProps> = ({size, fill, ...props}) => {
  return (
    <Svg width={24} height={24} fill="none">
      <Path
        d="M8.5 12.5h7M8.5 15.5h4"
        stroke="#17264B"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M5.5 5.9c0-.84 0-1.26.163-1.581a1.5 1.5 0 0 1 .656-.656c.32-.163.74-.163 1.581-.163h4.606c.367 0 .55 0 .723.041.153.037.3.098.433.18.152.093.281.223.54.482l3.595 3.594c.26.26.39.39.482.54.082.135.143.281.18.434.041.173.041.356.041.723V18.1c0 .84 0 1.26-.163 1.581a1.5 1.5 0 0 1-.656.655c-.32.164-.74.164-1.581.164H7.9c-.84 0-1.26 0-1.581-.163a1.5 1.5 0 0 1-.656-.656c-.163-.32-.163-.74-.163-1.581V5.9Z"
        stroke="#17264B"
        strokeWidth={1.5}
      />
      <Path
        d="M12.5 3.5v3.6c0 .84 0 1.26.164 1.581a1.5 1.5 0 0 0 .655.656c.32.163.74.163 1.581.163h3.6"
        stroke="#17264B"
        strokeWidth={1.5}
      />
    </Svg>
  );
};
