import React, {FC, useRef, useState} from 'react';

import {TextInput, View} from 'react-native';

import {useStyles} from './useStyles';

type Value = {
  value: string;
  id: number;
};

type TProps = {
  values: Value[];
  name: string;
};

export const ProfileCard: FC<TProps> = ({name, values}) => {
  const [isEditor, setIsEditor] = useState(false);
  const {styles} = useStyles();
  const inputRef = useRef<TextInput>(null);
  return <View>{/* {values.map((item) => )} */}</View>;
};
