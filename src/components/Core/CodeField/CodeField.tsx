import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
  CodeField as CodeFieldNative,
  Cursor,
} from 'react-native-confirmation-code-field';
import {Text} from '..';
import {useStyles} from './useStyles';

type TProps = {
  cellCount: number;
  handleSubmit: (value: string) => any;
};

export const CodeField: FC<TProps> = ({cellCount, handleSubmit}) => {
  const {styles} = useStyles();

  const [value, setValue] = useState('');

  const ref = useBlurOnFulfill({value, cellCount});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // useEffect(() => {
  //   ref.current.focus();
  // }, []);

  return (
    <CodeFieldNative
      {...props}
      ref={ref}
      textContentType="oneTimeCode"
      autoFocus
      autoComplete="sms-otp"
      keyboardType="numeric"
      onEndEditing={() => handleSubmit(value)}
      value={value}
      onChangeText={setValue}
      renderCell={({index, symbol, isFocused}) => (
        <View key={`code-${index}`} style={[styles.cell]}>
          <Text size={16} onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </View>
      )}
    />
  );
};
