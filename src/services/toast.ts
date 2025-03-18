import Toast from 'react-native-toast-message';

export enum ToastType {
  error = 'error',
  ok = 'ok',
  info = 'info',
}

type TArgs = {
  type: ToastType.error | ToastType.ok | ToastType.info;
  text1: string;
  text2?: string;
  topOffset?: number;
};

export const showToast = ({type, text1, text2, topOffset = 64}: TArgs) => {
  Toast.show({
    type,
    text1,
    text2,
    topOffset,
    position: 'top',
    visibilityTime: 3500,
  });
};
