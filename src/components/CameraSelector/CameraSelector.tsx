import {Camera, Gallery} from '@/assets';
import React, {FC, MutableRefObject, RefObject} from 'react';
import {useTranslation} from 'react-i18next';

import {TouchableOpacity, View} from 'react-native';

import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import ActionSheet, {ActionSheetProps} from 'react-native-actions-sheet';
import {Text} from '..';
import {useStyles} from './useStyles';

import Cropper from 'react-native-image-crop-picker';

type TProps = ActionSheetProps & {
  cameraRef: RefObject<ActionSheet>;
  onUploadItem?: (image: Asset) => any;
  onUploadItems?: (images: Asset[]) => any;
  limit?: number;
  hasCropping?: boolean;
  hasFooter?: boolean;
};

const crop = async (asset: Asset) => {
  return await Cropper.openCropper({
    path: asset.uri,
    mediaType: 'photo',
    height: 164,
    width: 164,
  });
};

export const CameraSelector: FC<TProps> = ({
  cameraRef,
  onUploadItem,
  limit = 1,
  onUploadItems,
  hasCropping,
  hasFooter,
  ...props
}) => {
  const {styles, iconColor} = useStyles();

  const {t} = useTranslation();

  const onOpenCamera = async () => {
    if (cameraRef.current) {
      const response = await launchCamera({
        cameraType: 'back',
        quality: 1,
        mediaType: 'photo',
      });

      if (!response.didCancel && response.assets.length) {
        if (limit === 1) {
          onUploadItem(
            hasCropping ? await crop(response.assets[0]) : response.assets[0],
          );
        } else {
          onUploadItems(response.assets);
        }
      }

      cameraRef.current.hide();
    }
  };

  const onOpenGallery = async () => {
    if (cameraRef.current) {
      const response = await launchImageLibrary({
        quality: 1,
        mediaType: 'photo',
        selectionLimit: limit,
      });

      if (!response.didCancel && response.assets.length) {
        if (limit === 1) {
          onUploadItem(
            hasCropping ? await crop(response.assets[0]) : response.assets[0],
          );
        } else {
          onUploadItems(response.assets);
        }
      }

      cameraRef.current.hide();
    }
  };

  return (
    <ActionSheet {...props} ref={cameraRef} containerStyle={styles.wrapper}>
      <View style={styles.content}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={onOpenGallery}>
          <Gallery size={24} fill={iconColor} />
          <Text margin={{left: 8}}>{t('image_picker.gallery')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.button, {marginTop: 16}]}
          onPress={onOpenCamera}>
          <Camera size={24} fill={iconColor} />
          <Text margin={{left: 8}}>{t('image_picker.camera')}</Text>
        </TouchableOpacity>
        {hasFooter && (
          <Text size={12} family="medium" margin={{top: 12}}>
            <Text family="roboto">*</Text>
            {t('profile_list.image_picker')}
          </Text>
        )}
      </View>
    </ActionSheet>
  );
};
