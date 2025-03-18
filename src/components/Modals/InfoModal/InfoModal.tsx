import {Close} from '@/assets';
import {Button, Loader, Modal} from '@/components';
import React, {FC, ReactNode} from 'react';
import {
  ModalProps,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {useStyles} from './useStyles';

type TProps = ModalProps & {
  handleSubmit: () => any;
  renderTitle: ReactNode;
  buttonTitle: string;
  visible: boolean;
  onClose: (value: boolean) => any;
  isLoading?: boolean;
  height?: number;
};

export const InfoModal: FC<TProps> = ({
  handleSubmit,
  renderTitle,
  visible,
  onClose,
  buttonTitle,
  isLoading,
  height,
  ...props
}) => {
  const {styles, color} = useStyles();

  return (
    <Modal {...props} visible={visible} onClose={onClose}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={0.9}
        onPress={() => onClose(false)}>
        <TouchableWithoutFeedback>
          <View style={[styles.wrapper, height && {height}]}>
            {isLoading ? (
              <Loader height={140} />
            ) : (
              <>
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity onPress={() => onClose(false)}>
                    <Close size={16} fill={color} />
                  </TouchableOpacity>
                </View>
                <View style={styles.content}>{renderTitle}</View>
                <Button margin={{top: 26}} onPress={handleSubmit}>
                  {buttonTitle}
                </Button>
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};
