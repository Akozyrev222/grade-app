import React, {Dispatch, FC} from 'react';

import {
  Modal as ModalNative,
  ModalProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useStyles} from './useStyles';

type TProps = ModalProps & {
  onClose?: boolean;
  children: any;
};

export const Modal: FC<TProps> = ({onClose, children, ...props}) => {
  const {styles} = useStyles();

  return (
    <ModalNative {...props} onRequestClose={() => onClose(false)} transparent>
      <View
        style={styles.wrapper}
        // activeOpacity={0.6}
        // onPress={() => onClose(false)}
      >
        <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
      </View>
    </ModalNative>
  );
};
