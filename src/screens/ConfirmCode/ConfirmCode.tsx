import React, {FC} from 'react';

import {View} from 'react-native';

import {LightLayout} from '@/layouts';
import {useData} from './useData';
import {useTranslation} from 'react-i18next';
import {CodeField, Loader, Text} from '@/components';
import {useStyles} from './useStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigation/AuthNavigator';
import {Routes} from '@/navigation';

type TProps = StackScreenProps<AuthStackParamList, Routes.CONFIRM_CODE>;

export const ConfirmCode: FC<TProps> = ({navigation, route}) => {
  const parent = route.params?.parent || 'SIGN_IN';

  const {phone, time, onSendCode, handleSubmit, isLoading, isSubmit} =
    useData(parent);
  const {styles} = useStyles();

  const {t} = useTranslation();

  if (isLoading || isSubmit) {
    return (
      <LightLayout>
        <Loader height={200} />
      </LightLayout>
    );
  }

  return (
    <LightLayout>
      <View style={styles.wrapper}>
        <Text size={16} align="center" family="medium">
          {t('confirm_code.type_code')}
        </Text>
        <Text margin={{top: 8}} size={16} align="center" family="medium">
          {phone}
        </Text>

        <View style={styles.resend}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              if (!time) {
                onSendCode();
              }
            }}>
            <Text color="gray" style={{textDecorationLine: 'underline'}}>
              {t('confirm_code.resend')}{' '}
            </Text>
          </TouchableOpacity>
          {!!time && (
            <Text>
              {t('confirm_code.after')} {time}
            </Text>
          )}
        </View>
        <View style={styles.codeInput}>
          <CodeField cellCount={4} handleSubmit={handleSubmit} />
        </View>
      </View>
    </LightLayout>
  );
};
