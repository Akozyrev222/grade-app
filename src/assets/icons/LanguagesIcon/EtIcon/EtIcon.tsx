import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

type TProps = {
  size: number;
};

export const EtIcon: FC<TProps> = ({size}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 90 65" fill="none">
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
      <Path d="M-2 21.75h95V45.5H-2V21.75Z" fill="#141414" />
      <Path
        d="M82.444-2H8.556A10.556 10.556 0 0 0-2 8.556V21.75h95V8.556A10.555 10.555 0 0 0 82.444-2Z"
        fill="#4891D9"
      />
      <Path
        d="M82.444 66.611H8.556A10.556 10.556 0 0 1-2 56.056V45.5h95v10.556A10.555 10.555 0 0 1 82.444 66.61Z"
        fill="#EEE"
      />
    </Svg>
  );
};
