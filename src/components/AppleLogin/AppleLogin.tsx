import React, {FC, RefObject} from 'react';
import {Text} from '@/components';
import {useTranslation} from 'react-i18next';
import {useStyles} from './useStyles';
import {Pressable} from 'react-native';
import {useData} from '@/components/AppleLogin/useData';
import {Apple} from '@/assets/icons/SocialNetworks/Apple';

type TProps = {
  refCode?: string;
};

export const AppleLogin: FC<TProps> = ({refCode}) => {
  const {t} = useTranslation();
  const {styles} = useStyles();
  const {onAppleButtonPress} = useData(refCode);

  return (
    <Pressable
      style={styles.socialNetworksBtn}
      onPress={() => onAppleButtonPress()}>
      <Apple size={24} />
      <Text style={styles.socialNetworksText}>
        {t('sign_in.sign_in_apple')}
      </Text>
    </Pressable>
  );
};
