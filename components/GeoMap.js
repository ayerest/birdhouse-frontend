import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  View, StyleSheet, ActivityIndicator, Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';
import LocationLogic from './LocationLogic';
import BirdIcon from '../assets/images/birdicon.png';

const styles = StyleSheet.create({
  mapContainer: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  mapExtras: {

  },
  center: {
    textAlign: 'center',
  },
  modal: {

  },
  button: {
    backgroundColor: Colors.myColor,
  },
});

const GeoMap = (props) => {
  const { showShares } = props;
  const [newMarker, setNewMarker] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(true);
  const [follow] = useState(!showShares);
  const myLocation = useSelector((state) => state.location.myLocation);

  const mapRegion = {
    latitude: (myLocation ? myLocation.lat : 46.6062),
    longitude: (myLocation ? myLocation.lng : -122.306417),
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const loadingLocation = () => {
    setIsGettingLocation(false);
  };

  const addMarkerHandler = (event) => {
    const mapTouchEvent = event;
    const lat = mapTouchEvent.nativeEvent.coordinate.latitude;
    const lng = mapTouchEvent.nativeEvent.coordinate.longitude;
    setNewMarker({ latitude: lat, longitude: lng });
  };

  return (
    <View style={styles.mapContainer}>
      <LocationLogic stillLoading={loadingLocation} />
      {isGettingLocation && !myLocation
      && <ActivityIndicator size="large" color={Colors.linkColor} />}
      {!isGettingLocation && myLocation
          && (
          <MapView
            showsUserLocation={follow}
            followsUserLocation={follow}
            style={styles.map}
            initialRegion={mapRegion}
            onPress={addMarkerHandler}
          >
            {(newMarker
              && (
                <Marker
                  {...props}
                  title="New Bird Sighting"
                  coordinate={newMarker}
                  onPress={() => {
                    props.navigation.navigate({
                      name: 'Add Entry',
                      params: {
                        coords: newMarker,
                      },
                    });
                  }}
                >
                  <Image style={{ height: 50, width: 50 }} source={BirdIcon} />
                </Marker>
              )
            )}
          </MapView>
          )}
    </View>
  );
};

GeoMap.defaultProps = {
  navigation: '',
  showShares: false,
};

GeoMap.propTypes = {
  navigation: PropTypes.instanceOf(Object),
  showShares: PropTypes.bool,
};

export default GeoMap;
