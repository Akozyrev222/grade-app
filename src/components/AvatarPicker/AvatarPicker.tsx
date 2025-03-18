import {Edit} from '@/assets';
import {User} from '@/bus/user';
import React, {FC, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {Asset} from 'react-native-image-picker';
import {CameraSelector} from '../CameraSelector';
import {Avatar, Text} from '../Core';
import {useStyles} from './useStyles';

type TProps = {
  onChange?: (v: any) => any;
  value: Asset | null;
  size?: 'extraSmall' | 'small' | 'medium' | 'large';
  notEdit?: boolean;
};

export const AvatarPicker: FC<TProps> = ({onChange, value, size, notEdit}) => {
  const ref = useRef<ActionSheet>(null);

  const {styles, iconColor} = useStyles();

  return (
    <View>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => (onChange && !notEdit ? ref.current?.show() : false)}
        activeOpacity={onChange && !notEdit ? 0.8 : 1}>
        {onChange && (
          <View style={styles.editButtonWrapper}>
            {notEdit ? null : (
              <View style={styles.editButton}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => ref.current?.show()}>
                  <Edit fill={iconColor} size={12} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        <Avatar size={size} url={value?.uri || ''} variant={'sharp_square'} />
      </TouchableOpacity>

      <CameraSelector
        hasFooter
        cameraRef={ref}
        // hasCropping
        onUploadItem={(image: User.Image) => {


          onChange({
            uri: image.uri,
            type: image.type,
            name: image.fileName,
          });
        }}>
        <View />
      </CameraSelector>
    </View>
  );
};
