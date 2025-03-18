import React, {FC, ReactNode} from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Button} from '@/components';
import {useStyles} from './useStyles';
import {useTranslation} from 'react-i18next';
import {useDataModal} from './useDataModal';

export const TabBarModal = () => {
  const {t} = useTranslation();
  const {styles} = useStyles();
  const {onCloseTabBarModal} = useDataModal();
  return (
    <View style={styles.overlayView}>
      <TouchableOpacity style={styles.overlay} activeOpacity={0.9}>
        <TouchableWithoutFeedback>
          <View style={styles.wrapper}>
            <View style={styles.content}>
              <Text style={styles.text}>
                {t('profile_list.fill_modal_title')}
              </Text>
            </View>
            <View style={styles.footer}>
              <Button
                style={styles.button}
                weight="medium"
                margin={{top: 26}}
                onPress={onCloseTabBarModal}>
                {t('profile_list.fill_profile')}
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </View>
  );
};
