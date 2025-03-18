import React, {FC, useCallback, useMemo} from 'react';

import {useStyles} from './useStyles';

import {Modal, Pressable, View, TouchableOpacity} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {Close} from '@/assets';
import {Text} from '../Core';
import {vi} from 'date-fns/locale';

type TImage = {
  url: string;
};

type TProps = {
  urls: TImage[];
  visible: string;
  onClose: (value: string) => any;
};

export const ImageZoomer: FC<TProps> = ({urls, visible, onClose}) => {
  const {styles, iconColor} = useStyles();

  const index = useMemo(() => {
    const index = urls.findIndex(({url}) => url == visible);

    if (index === -1) {
      return 0;
    }

    return index;
  }, [visible, urls]);

  const renderHeader = useCallback((curr: number) => {
    return (
      <View style={styles.header}>
        <View style={{height: 56, width: 56}} />
        <Text color="light" family="roboto" size={18} style={{height: 28}}>
          {curr + 1} / {urls.length}
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            height: 56,
            width: 56,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => onClose('')}>
          <View style={styles.closeWrapper}>
            <Close size={16} fill={iconColor} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <Modal onRequestClose={() => onClose('')} visible={!!visible} transparent>
      <ImageViewer
        renderHeader={renderHeader}
        renderIndicator={(curr) => <></>}
        onSwipeDown={() => onClose('')}
        index={index}
        imageUrls={urls}
      />
    </Modal>
  );
};
