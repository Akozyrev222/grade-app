import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

type TProps = {
  size: number;
};

export const ElIcon: FC<TProps> = ({size}) => {
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
        d="M20.43 36.264H-2v6.597h95v-6.597H20.431ZM-2 56.056c0 .448.037.886.092 1.32H92.91c.053-.434.09-.872.09-1.32v-5.278H-2v5.278ZM34.944 21.75H93v6.597H34.944V21.75Zm0-14.514v6.598H93V8.556c0-.449-.037-.887-.092-1.32H34.944Z"
        fill="#EEE"
      />
      <Path
        d="M34.944 13.833H93v7.917H34.944v-7.917ZM-2 42.861h95v7.917H-2V42.86Zm5.45 22.43h84.1a10.561 10.561 0 0 0 5.36-7.916H-1.908a10.55 10.55 0 0 0 5.357 7.917ZM-2 21.75h14.514v14.514H-2V21.75Zm36.944 6.597V21.75H20.431v14.514H93v-7.917H34.944ZM87.551-.68A10.503 10.503 0 0 0 82.444-2H8.556A10.56 10.56 0 0 0-1.91 7.236c-.053.433-.09.87-.09 1.32v5.277h14.514V-.68h7.917v14.514h14.513V7.236h57.964A10.55 10.55 0 0 0 87.55-.68Z"
        fill="#0D5EB0"
      />
      <Path
        d="M20.43 13.833V-2h-7.916v15.833H-2v7.917h14.514v14.514h7.917V21.75h14.513v-7.917H20.431Z"
        fill="#EEE"
      />
    </Svg>
  );
};
