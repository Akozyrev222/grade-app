import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '@/components';
import {useStyles} from './useStyles';
import {Settings} from '@/assets/icons/Settings';
import {ArrowRight} from '@/assets/icons/ArrowRight';
import {MyProfile} from '@/assets/icons/MyProfile';
import {ReferralProgram} from '@/assets/icons/ReferralProgram';

type TProps = {
  title: string;
  onPress: () => any;
  icon: string;
};

export const MyProfileCard: FC<TProps> = ({title, onPress, icon}) => {
  const styles = useStyles();

  const renderIcon = (icon) => {
    if (icon === 'MY_PROFILE') {
      return <MyProfile />;
    } else if (icon === 'REFERRAL_PROGRAM') {
      return <ReferralProgram />;
    } else if (icon === 'SETTINGS') {
      return <Settings />;
    }
  };

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <View style={styles.row}>
        {renderIcon(icon)}
        <Text style={styles.text}>{title}</Text>
      </View>
      <ArrowRight />
    </TouchableOpacity>
  );
};
