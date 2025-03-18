import React, {ReactNode} from 'react';

import {Text} from '@/components';

type TArgs = {
  last?: number;
  value: string;
};

export const formatPhone = ({value, last = 4}: TArgs): ReactNode => {
  const length = value.length;

  return (
    <>
      <Text family="roboto">
        {value.slice(0, length - last).replace(/\d|\+|\s/g, '*')}
      </Text>
      {value.slice(length - last)}
    </>
  );
};
