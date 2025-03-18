import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, Loader, Text} from '@/components';
import {useStyles} from './useStyles';
import {useTranslation} from 'react-i18next';
import {useData} from './useData';
import {ReferralProgram} from '@/bus/referral_program/types';

type TProps = {
  item: ReferralProgram;
};

export const ReferralProgramCard: FC<TProps> = ({item}) => {
  const {styles} = useStyles();
  const {t} = useTranslation();
  const {getTitle, activateReferral, isLoading} = useData();

  return (
    <View
      style={[
        styles.wrapper,
        (item.acceptable_for_use || item.used) && styles.activeCard,
      ]}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text family="bold" size={14}>
            {getTitle(item.identifier)}
          </Text>
        </View>
      </View>
      {!item.acceptable_for_use && !item.used ? (
        <Text style={styles.text}>
          {t('referral_program.gift')}
          <Text style={styles.boldText}>
            {' '}
            {item.amount - item.referrals_count}{' '}
          </Text>
          {t('referral_program.friends')}
          <Text style={styles.boldText}> {item.amount}</Text>
        </Text>
      ) : item.acceptable_for_use && !item.used ? (
        <Text style={styles.text}>
          {t('referral_program.acceptable_for_use.invited')}
          <Text style={styles.boldText}> {item.amount} </Text>
          {t('referral_program.acceptable_for_use.friends')}
        </Text>
      ) : (
        <Text style={styles.text}>{t('referral_program.used')}</Text>
      )}
      {!!item.acceptable_for_use && !item.used && (
        <View style={styles.footer}>
          <Text color="gray" family="medium">
            {t('vip.duration')}
          </Text>
          {isLoading ? (
            <Loader size="small" width={80} height={44} />
          ) : (
            <Button
              onPress={() => activateReferral(item.id.toString())}
              size="small"
              style={styles.button}
              color={'default'}
              margin={{top: 8}}>
              {t('buttons.get')}
            </Button>
          )}
        </View>
      )}
    </View>
  );
};
