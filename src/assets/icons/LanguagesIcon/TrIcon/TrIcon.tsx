import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

type TProps = {
  size: number;
};

export const TrIcon: FC<TProps> = ({size}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 90" fill="none">
      <Path
        d="M10.111 0A10.111 10.111 0 0 0 0 10.111v45.5a10.111 10.111 0 0 0 10.111 10.111h20.222V0H10.111Z"
        fill="#002B7F"
      />
      <Path d="M30.334 0h30.333v65.722H30.333V0Z" fill="#FCD116" />
      <Path
        d="M80.889 0H60.667v65.722h20.222a10.111 10.111 0 0 0 10.11-10.11v-45.5A10.111 10.111 0 0 0 80.89 0Z"
        fill="#CE1126"
      />
      <Path d="M-2 21.75h95v21.111H-2V21.75Z" fill="#EEE" />
      <Path
        d="M82.444-2H8.556A10.556 10.556 0 0 0-2 8.556V21.75h95V8.556A10.555 10.555 0 0 0 82.444-2Z"
        fill="#CD2A3E"
      />
      <Path
        d="M8.556 66.611h73.888A10.555 10.555 0 0 0 93 56.056V42.86H-2v13.195A10.556 10.556 0 0 0 8.556 66.61Z"
        fill="#436F4D"
      />
      <Path
        d="M93 56.056A10.555 10.555 0 0 1 82.444 66.61H8.556A10.556 10.556 0 0 1-2 56.056v-47.5A10.556 10.556 0 0 1 8.556-2h73.888A10.555 10.555 0 0 1 93 8.556v47.5Z"
        fill="#E30917"
      />
      <Path
        d="M40.222 48.138a15.833 15.833 0 1 1 0-31.666c3.457 0 6.65 1.121 9.255 3.003A19.348 19.348 0 0 0 34.944 12.9a19.404 19.404 0 0 0-7.426 37.333 19.403 19.403 0 0 0 7.426 1.477c5.793 0 10.978-2.551 14.533-6.576a15.735 15.735 0 0 1-9.255 3.003Zm10.326-15.226 6.439 1.483.58 6.579 3.4-5.663 6.438 1.48-4.338-4.982 3.396-5.666-6.077 2.586-4.339-4.984.581 6.58-6.08 2.587Z"
        fill="#EEE"
      />
    </Svg>
  );
};
