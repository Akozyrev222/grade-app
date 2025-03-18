import React, {FC} from 'react';
import {Text} from '@/components';
import {useTranslation} from 'react-i18next';
import {useStyles} from './useStyles';
import {TouchableOpacity, Platform} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Google} from '@/assets/icons/SocialNetworks/Google';
import {useData} from '@/components/GoogleLogin/useData';

GoogleSignin.configure(
  Platform.OS === 'ios'
    ? {
        iosClientId:
          '808768103628-mte62md738qo4n9hti249hq87952f1uq.apps.googleusercontent.com',
      }
    : {
        webClientId:
          '808768103628-n25lp21fu1lr441mst6kg3kpujbub9kf.apps.googleusercontent.com',
        offlineAccess: true,
        iosClientId:
          '808768103628-mte62md738qo4n9hti249hq87952f1uq.apps.googleusercontent.com',
      },
);

type TProps = {
  refCode?: string;
};

export const GoogleLogin: FC<TProps> = ({refCode}) => {
  const {t} = useTranslation();
  const {styles} = useStyles();
  const {login} = useData(refCode);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.socialNetworksBtn}
      onPress={() => {
        login();
      }}>
      <Google size={24} />
      <Text style={styles.socialNetworksText}>
        {t('sign_in.sign_in_google')}
      </Text>
    </TouchableOpacity>
  );
};
