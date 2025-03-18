import React, {FC, useEffect, useMemo, useRef} from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  LatLng,
  MapViewProps,
} from 'react-native-maps';

import {View} from 'react-native';
import {useStyles} from './useStyles';

type TProps = MapViewProps & {
  onChangeLocation: (location: LatLng) => any;
  location: LatLng | null;
  size?: 'regular' | 'small';
  marker?: FC<{location: LatLng}>;
};

export const Map: FC<TProps> = ({
  onChangeLocation,
  location,
  marker,
  size,
  ...props
}) => {
  const {styles} = useStyles();

  const sizeData = useMemo(() => {
    switch (size) {
      case 'regular':
        return {
          height: 256,
        };
      case 'small':
        return {};
    }
  }, [size]);

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (mapRef?.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
      });
    }
  }, [location]);

  return (
    <View style={styles.wrapper}>
      <MapView
        {...props}
        style={styles.content}
        maxZoomLevel={15}
        provider={PROVIDER_GOOGLE}
        zoomControlEnabled={true}
        ref={mapRef}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
        onPress={(e) => {
          onChangeLocation(e.nativeEvent.coordinate);
        }}>
        {location && <Marker coordinate={location} />}
      </MapView>
    </View>
  );
};
