import React, {FC} from 'react';
import {Facebook} from '@/assets/icons/SocialNetworks/Facebook';
import {Text} from '@/components';
import {useTranslation} from 'react-i18next';
import {useStyles} from './useStyles';
import {useData} from '@/components/FacebookLogin/useData';
import { TouchableOpacity } from 'react-native';

type TProps = {
    refCode?: string;
};

export const FacebookLogin: FC<TProps> = ({refCode}) => {
  const {t} = useTranslation();
  const {styles} = useStyles();
  const {login} = useData(refCode);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.socialNetworksBtn}
      onPress={() => login()}>
      <Facebook size={24} />
      <Text style={styles.socialNetworksText}>
        {t('sign_in.sign_in_facebook')}
      </Text>
    </TouchableOpacity>
  );
};
