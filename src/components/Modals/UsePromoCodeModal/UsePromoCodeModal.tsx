import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ModalProps,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Modal, Text} from '@/components';
import {useStyles} from './useStyles';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '@/bus/user';
import {Purchase, PurchaseType} from '@/screens/Vip/Vip';
import {TOP_PRODUCT} from '@/constants';
import {getLoader, getPromoCodeSuccess} from '@/bus/user/selectors';

type TProps = ModalProps & {
  renderTitle: ReactNode;
  visible: boolean;
  onClose: () => any;
  purchase: Purchase;
};

const KeyboardLayout = ({children}) => {
  const {styles} = useStyles();
  return Platform.OS === 'ios' ? (
    <View style={styles.viewWrapper}>{children}</View>
  ) : (
    children
  );
};


export const UsePromoCodeModal: FC<TProps> = ({
  onClose,
  visible,
  renderTitle,
  purchase,
  ...props
}) => {
  const [promoCode, setPromoCode] = useState('');
  const dispatch = useDispatch();
  const promoCodeSuccess = useSelector(getPromoCodeSuccess);
  const loading = useSelector(getLoader);
  const {styles, placeholderColors} = useStyles();
  const {t} = useTranslation();

  const inputRef = useRef<TextInput>(null);

  const closeModal = useCallback(() => {
    onClose();
    setPromoCode('');
    dispatch(userActions.promoCodeSuccessRemove());
  }, [onClose]);

  useEffect(() => {
    if (!visible || promoCodeSuccess) {
      closeModal();
    }
  }, [closeModal, promoCodeSuccess]);

  const sendPromoCode = useCallback(() => {
    const payload =
      purchase.purchaseType === PurchaseType.TOP
        ? {
            code: promoCode,
            identifier: TOP_PRODUCT[Number(purchase.purchase)],
            days: Number(purchase.purchase),
          }
        : {
            code: promoCode,
            identifier: purchase.purchase,
          };

    dispatch(userActions.sendPromoCodeAsync(payload));
  }, [purchase, promoCode]);

  return (
    <Modal {...props} animationType="fade" visible={visible} onClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}>
        <KeyboardLayout>
          <TouchableWithoutFeedback>
            <View style={styles.wrapper}>
              <View style={styles.content}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => closeModal()}>
                  <Text size={16} color={'gray'}>
                    {t(`use_promo_code_modal.button_cancel`)}
                  </Text>
                </TouchableOpacity>
                <Text size={18} color={'default'}>
                  {t(`use_promo_code_modal.title`)}
                </Text>
                <TouchableOpacity activeOpacity={0.9} onPress={sendPromoCode}>
                  <Text size={16} color={'green'}>
                    {t(`use_promo_code_modal.button_apply`)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputWrapper}>
                <Pressable
                  onPress={() => {
                    inputRef.current?.blur();
                    inputRef.current?.focus();
                  }}>
                  <View pointerEvents="none">
                    <TextInput
                      placeholder={t(`use_promo_code_modal.input_placeholder`)}
                      style={styles.input}
                      onChangeText={setPromoCode}
                      value={promoCode}
                      placeholderTextColor={placeholderColors}
                      ref={(ref) => {
                        inputRef.current = ref;
                      }}
                    />
                  </View>
                </Pressable>
                {!!loading && (
                  <ActivityIndicator style={styles.loader} size={'small'} />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardLayout>
      </KeyboardAvoidingView>
    </Modal>
  );
};
