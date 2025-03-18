import React, {FC, useMemo} from 'react';

import {Star} from '@/assets';
import {View, ViewProps} from 'react-native';
import {useStyles} from './useStyles';

type TProps = ViewProps & {
  rating: number;

  emptyColor?: string;
};

const STARS = [1, 2, 3, 4, 5];

export const Rating: FC<TProps> = ({rating, emptyColor, ...props}) => {
  const {filledColor, styles, voidColor} = useStyles();

  // const id = useId

  const renderStars = useMemo(() => {
    return STARS.map((star) => (
      <Star
        size={20}
        style={{marginRight: star === 5 ? 0 : 0}}
        fill={star - 1 < rating ? filledColor : emptyColor || voidColor}
        key={`star-${star}-executor${rating}`}
      />
    ));
  }, [rating, emptyColor]);

  return (
    <View style={[styles.wrapper, props.style]} {...props}>
      {renderStars}
    </View>
  );
};
