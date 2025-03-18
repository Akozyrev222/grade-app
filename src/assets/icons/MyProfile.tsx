import React, {FC} from 'react';
import {Path, Svg} from 'react-native-svg';

export const MyProfile: FC = () => {
  return (
    <Svg width={24} height={19} fill="none">
      <Path
        d="M21 1.5H3c-1.105 0-2 .936-2 2.09v12.54c0 1.154.895 2.09 2 2.09h18c1.105 0 2-.936 2-2.09V3.59c0-1.154-.895-2.09-2-2.09ZM4 6.417h9M4 9.37h9M4 13.303h9"
        stroke="#17264B"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
