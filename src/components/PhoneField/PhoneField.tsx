import React, {FC, ReactNode, useEffect, useState} from 'react';
import {TextInputProps} from 'react-native';
import {InputKeysIcon} from '@/themes/palletes/types';
import {FieldError} from 'react-hook-form';

import {MaskedField, CountryCode} from '@/components';
import {COUNTRY_CODES} from '@/constants';

type TProps = TextInputProps & {
  onChangeText: (value: string) => any;
  margin?: {
    right?: number;
    bottom?: number;
    top?: number;
    left?: number;
  };
  initCode?: string;
  initPhoneMask?: string;
  label?: string;
  error: FieldError;
  focusedColor?: InputKeysIcon;
  blurColor?: InputKeysIcon;
  rightIcon?: ReactNode;
  errorEmpty?: boolean;
  init?: string;
};

export const PhoneField: FC<TProps> = ({
  onChangeText,
  init = '',
  errorEmpty = false,
  initCode = '+380',
  initPhoneMask = '99 99 999 99',
  ...props
}) => {
  const [value, setValue] = useState(init);

  const [code, setCode] = useState(initCode);

  const [phoneMask, setPhoneMask] = useState(
    COUNTRY_CODES.find((code) => code.code === initCode)?.mask || initPhoneMask,
  );

  useEffect(() => {
    onChangeText(`${code} ${value}`);
  }, [value, code]);

  return (
    <MaskedField
      phone_mask={phoneMask}
      leftIcon={
        <CountryCode
          code={initCode}
          onSelect={(item) => {
            setCode(item.code);
            setPhoneMask(item.phone_mask);
          }}
        />
      }
      value={value}
      onChangeText={(value) => setValue(value)}
      has_error={!errorEmpty}
      {...props}
    />
  );
};
