import React, {FC} from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

type TProps = {
  size: number;
};

export const ViberIcon: FC<TProps> = ({size}) => {
  return (
    <Svg
      width={size}
      height={size}
      aria-label="Viber"
      viewBox="0 0 512 512"
      fill="#665ca7">
      <Rect rx="15%" fill="#ffffff" />
      <Path
        fill="none"
        stroke="#665ca7"
        stroke-linecap="round"
        stroke-width="10"
        d="M269 186a30 30 0 0 1 31 31m-38-58a64 64 0 0 1 64 67m-73-93a97 97 0 0 1 99 104"
      />
      <Path d="M288 274q10-13 24-4l36 27q8 10-7 28t-28 15q-53-12-102-60t-61-104q0-20 25-34 13-9 22 5l25 35q6 12-7 22c-39 15 51 112 73 70zM95 232c0 78 14 95 36 118 7 7 32 19 38 19v69c0 4 4 7 8 3l53-63 26 1c144 0 161-56 161-147S400 85 256 85 95 141 95 232zm-30 0c0-126 55-177 191-177s191 51 191 177-55 177-191 177c-10 0-18 0-32-2l-38 43c-7 8-28 11-28-13v-42c-6 0-20-6-39-18-19-13-54-44-54-145z" />
    </Svg>
  );
};
