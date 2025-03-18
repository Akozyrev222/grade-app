import React, {FC, ReactNode} from 'react';
import {
  ModalProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Button, Modal} from '@/components';
import {useStyles} from './useStyles';
import {useTranslation} from 'react-i18next';

type TProps = ModalProps & {
  handleSubmit: () => any;
  renderTitle: ReactNode;
  visible: boolean;
  onClose: () => any;
  forLogged?: boolean;
};

export const WarningModal: FC<TProps> = ({
  onClose,
  visible,
  renderTitle,
  handleSubmit,
  forLogged,
  ...props
}) => {
  const {styles} = useStyles();

  const {t} = useTranslation();

  return (
    <Modal {...props} visible={visible} onClose={onClose}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={0.9}
        onPress={onClose}>
        <TouchableWithoutFeedback>
          <View style={styles.wrapper}>
            <View style={styles.content}>{renderTitle}</View>
            <View style={styles.footer}>
              <Button
                style={styles.button}
                color="light"
                weight="medium"
                margin={{top: 26}}
                onPress={onClose}>
                {t(`buttons.${forLogged ? 'cancel' : 'no'}`)}
              </Button>
              <Button
                style={styles.button}
                margin={{top: 26}}
                weight="medium"
                onPress={handleSubmit}>
                {t(`buttons.${forLogged ? 'open' : 'yes'}`)}
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};
