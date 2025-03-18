import {useTheme} from '@/hooks';
import {Fonts} from '@/themes';
import React from 'react';
import {Dimensions} from 'react-native';

import Toast, {BaseToast, ToastConfigParams} from 'react-native-toast-message';

export const ToastLayout = () => {
  const {pallete, fonts} = useTheme();

  const toastConfig = {
    error: ({text1, ...props}: ToastConfigParams<{}>) => (
      <BaseToast
        {...props}
        {...props}
        text1Style={{
          fontFamily: Fonts.bold,
          fontWeight: '400',
          fontSize: 14,

          color: pallete.text.danger,

          textAlign: 'center',

          width: '100%',
        }}
        text2Style={{
          fontFamily: fonts.light,
          fontWeight: '400',
          fontSize: 12,

          color: pallete.text.danger,

          textAlign: 'center',

          width: '100%',
        }}
        text1={text1}
        contentContainerProps={{
          style: {
            width: Dimensions.get('screen').width - 32,
            height: 64,

            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: pallete.background.dark_blur,

            borderRadius: 8,
          },
        }}
        touchableContainerProps={{
          style: {
            backgroundColor: 'transparent',
            borderRadius: 8,
          },
        }}
      />
    ),
    success: ({text1, ...props}: ToastConfigParams<{}>) => null,
    info: ({text1, ...props}: ToastConfigParams<{}>) => {
      return (
        <BaseToast
          {...props}
          text1Style={{
            fontFamily: Fonts.bold,
            fontWeight: '400',
            fontSize: 14,

            color: pallete.text.default,

            textAlign: 'center',

            width: '100%',
          }}
          text1Props={{
            numberOfLines: 2,
          }}
          text2Style={{
            fontFamily: fonts.light,
            fontWeight: '400',
            fontSize: 12,

            color: pallete.text.default,

            textAlign: 'center',

            width: '100%',
          }}
          text1={text1}
          contentContainerProps={{
            style: {
              width: Dimensions.get('screen').width - 32,
              height: 64,

              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: pallete.background.dark_blur,

              borderRadius: 8,
            },
          }}
          touchableContainerProps={{
            style: {
              backgroundColor: 'transparent',
              borderRadius: 8,
            },
          }}
        />
      );
    },
    ok: ({text1, ...props}: ToastConfigParams<{}>) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: pallete.border.success,
          backgroundColor: pallete.background.light,
        }}
        contentContainerStyle={{paddingHorizontal: 16}}
        text1Style={{
          fontFamily: fonts.regular,
          color: pallete.text.success,
          fontSize: 10,
        }}
        text1={text1}
      />
    ),
  };

  return <Toast config={toastConfig} />;
};
