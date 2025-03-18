import React, {FC} from 'react';
import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import {useStyles} from './useStyles';

type TProps = TouchableOpacityProps & {
  active: boolean;
  disabled?: boolean;
  setPurchaseType: () => void;
};

export const RadioButton: FC<TProps> = ({
  active,
  disabled,
  setPurchaseType,
}) => {
  const {styles} = useStyles();

  return (
    <TouchableOpacity disabled={disabled} onPress={() => setPurchaseType()}>
      <View
        style={
          active
            ? [styles.wrapper, styles.wrapperActiveRadioBtn]
            : styles.wrapper
        }>
        <View
          style={
            active ? [styles.radioBtn, styles.activeRadioBtn] : styles.radioBtn
          }></View>
      </View>
    </TouchableOpacity>
  );
};
