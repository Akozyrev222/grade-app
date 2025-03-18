import React, {FC} from 'react';

import {G, Path, Svg, SvgProps} from 'react-native-svg';

type TProps = SvgProps & {
  size: number;
  fill: string;
};

export const User: FC<TProps> = ({size, fill, ...props}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 25" fill="none" {...props}>
      <G opacity="0.5">
        <Path
          d="M20 21.875V19.7917C20 18.6866 19.5786 17.6268 18.8284 16.8454C18.0783 16.064 17.0609 15.625 16 15.625H8C6.93913 15.625 5.92172 16.064 5.17157 16.8454C4.42143 17.6268 4 18.6866 4 19.7917V21.875"
          fill={fill}
        />
        <Path
          d="M12 11.4583C14.2091 11.4583 16 9.59285 16 7.29167C16 4.99048 14.2091 3.125 12 3.125C9.79086 3.125 8 4.99048 8 7.29167C8 9.59285 9.79086 11.4583 12 11.4583Z"
          fill={fill}
        />
      </G>
    </Svg>
  );
};
