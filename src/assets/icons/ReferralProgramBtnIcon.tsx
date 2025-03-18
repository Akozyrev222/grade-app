import React, {FC} from 'react';
import {Path, Svg} from 'react-native-svg';

export const ReferralProgramBtnIcon: FC = () => {
  return (
    <Svg width={18} height={19} fill="none">
      <Path
        d="M17.25.05h-12A.75.75 0 0 0 4.5.8v3.75H.75A.75.75 0 0 0 0 5.3v12a.75.75 0 0 0 .75.75h12a.75.75 0 0 0 .75-.75v-3.75h3.75a.75.75 0 0 0 .75-.75V.8a.75.75 0 0 0-.75-.75Zm-.75 12h-3V5.3a.75.75 0 0 0-.75-.75H6v-3h10.5v10.5Z"
        fill="#17264B"
      />
    </Svg>
  );
};
