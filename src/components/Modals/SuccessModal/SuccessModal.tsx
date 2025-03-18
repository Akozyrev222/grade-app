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
  renderTitle: ReactNode;
  visible: boolean;
  onClose: () => any;
  forLogged?: boolean;
};

export const SuccessModal: FC<TProps> = ({
  onClose,
  visible,
  renderTitle,
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
                weight="medium"
                margin={{top: 26}}
                onPress={onClose}>
                {t(`success_modal.button`)}
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};
