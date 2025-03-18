import * as React from 'react';
import Svg, {Rect, Path, SvgProps} from 'react-native-svg';
import {FC} from 'react';

type TProps = SvgProps & {
  fill: string;
  size: number;
};

export const QRCode: FC<TProps> = ({size, fill}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M23.125 19.75h-3a.375.375 0 0 0-.375.375v3c0 .207.168.375.375.375h3a.375.375 0 0 0 .375-.375v-3a.375.375 0 0 0-.375-.375ZM19.375 16.75h-2.25a.375.375 0 0 0-.375.375v2.25c0 .207.168.375.375.375h2.25a.375.375 0 0 0 .375-.375v-2.25a.375.375 0 0 0-.375-.375ZM26.125 23.5h-2.25a.375.375 0 0 0-.375.375v2.25c0 .207.168.375.375.375h2.25a.375.375 0 0 0 .375-.375v-2.25a.375.375 0 0 0-.375-.375ZM26.125 16.75h-1.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375ZM18.625 24.25h-1.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375ZM23.125 8.5h-3a.375.375 0 0 0-.375.375v3c0 .207.168.375.375.375h3a.375.375 0 0 0 .375-.375v-3a.375.375 0 0 0-.375-.375Z"
        fill={fill}
      />
      <Path
        d="M25 6.25h-6.75a.75.75 0 0 0-.75.75v6.75c0 .414.336.75.75.75H25a.75.75 0 0 0 .75-.75V7a.75.75 0 0 0-.75-.75Z"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.875 8.5h-3a.375.375 0 0 0-.375.375v3c0 .207.168.375.375.375h3a.375.375 0 0 0 .375-.375v-3a.375.375 0 0 0-.375-.375Z"
        fill={fill}
      />
      <Path
        d="M13.75 6.25H7a.75.75 0 0 0-.75.75v6.75c0 .414.336.75.75.75h6.75a.75.75 0 0 0 .75-.75V7a.75.75 0 0 0-.75-.75Z"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.875 19.75h-3a.375.375 0 0 0-.375.375v3c0 .207.168.375.375.375h3a.375.375 0 0 0 .375-.375v-3a.375.375 0 0 0-.375-.375Z"
        fill={fill}
      />
      <Path
        d="M13.75 17.5H7a.75.75 0 0 0-.75.75V25c0 .414.336.75.75.75h6.75a.75.75 0 0 0 .75-.75v-6.75a.75.75 0 0 0-.75-.75Z"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default QRCode;
