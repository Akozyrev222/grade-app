import {CustomMarker} from '@/assets';
import React, {FC} from 'react';

import {useStyles} from './useStyles';

import MapView, {PROVIDER_GOOGLE, Marker, LatLng} from 'react-native-maps';
import {View} from 'react-native';

type TProps = {
  location: LatLng;
};

export const MapStatic: FC<TProps> = ({location}) => {
  const {styles, iconColor} = useStyles();

  return (
    <View style={styles.wrapper}>
      <MapView
        style={styles.content}
        maxZoomLevel={15}
        provider={PROVIDER_GOOGLE}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        loadingEnabled={false}
        zoomEnabled={false}
        zoomTapEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}>
        {!!location && (
          <Marker coordinate={location} draggable={false}>
            <CustomMarker fill={iconColor} size={8} />
          </Marker>
        )}
      </MapView>
    </View>
  );
};
