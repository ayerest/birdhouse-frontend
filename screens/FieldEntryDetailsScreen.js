/* eslint-disable global-require */
import React from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Dimensions, SafeAreaView
} from 'react-native';
import uuid from 'uuid';
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import AvatarButton from '../components/AvatarButton';
import Colors from '../constants/Colors';

// TODO: remove uuid for keys
// TODO: refactor stylesheet and move to a separate file

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.5,
    resizeMode: 'contain',
    borderRadius: 20,
    justifyContent: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
    flex: 1,
    borderRadius: 20,
  },
  mapContainer: {
    height: '80%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    fontFamily: 'Roboto-Condensed',
    fontSize: 18,
    padding: 2,
    alignSelf: 'center',
  },
  imageContainer: {
    flex: 1,
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-Condensed',
    fontSize: 18,
  },
  notes: {
    fontFamily: 'Roboto-Condensed',
    fontSize: 20,
    padding: 10,
  },
  birdDetails: {
    fontFamily: 'Roboto-Condensed',
    fontSize: 20,
    color: Colors.linkColor,
    padding: 10,
  },
  flex: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const FieldEntryDetailsScreen = ({ navigation, route }) => {
  const entryDate = moment(route.params.entry.date).format('MMMM Do YYYY, h:mm:ss a');

  const renderFieldEntryImage = (image) => (
    <Image style={styles.image} source={{ uri: image.item.img_url }} />
  );

  return (

    <Card style={styles.screen}>
      <Text style={styles.right}>{entryDate}</Text>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
          navigation.navigate({
            name: 'Bird Details',
            params: {
              birdId: route.params.entry.bird.id,
              birdName: route.params.entry.bird.common_name,
              user: route.params.entry.user,
            },
          });
        }}
      >
        <Text style={styles.birdDetails}>{route.params.entry.bird.common_name}</Text>
        {route.params.entry.images.length > 0
          ? <FlatList keyExtractor={() => uuid()} data={route.params.entry.images} renderItem={renderFieldEntryImage} numColumns={1} /> : <Image style={styles.image} source={require('../assets/images/birdicon.png')} />}
      </TouchableOpacity>
      <View style={styles.flex}>
        <Text style={styles.notes}>Notes:</Text>
        <Text style={styles.text}>{route.params.entry.notes}</Text>
      </View>
      <MapView
        style={styles.map}
        region={{
          latitude: route.params.entry.latitude,
          longitude: route.params.entry.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        <Marker
          coordinate={
              { latitude: route.params.entry.latitude, longitude: route.params.entry.longitude }
              }
        >
          <Image style={{ height: 50, width: 50 }} source={require('../assets/images/birdicon.png')} />
        </Marker>
      </MapView>
    </Card>
  );
};

FieldEntryDetailsScreen.defaultProps = {
  navigation: '',
  route: '',
};

FieldEntryDetailsScreen.propTypes = {
  navigation: PropTypes.instanceOf(Object),
  route: PropTypes.instanceOf(Object),
};

export const screenOptions = (navData) => ({
  headerRight: () => (
    <AvatarButton handleClick={() => {
      navData.navigation.navigate({
        name: 'My Account',
        params: {
        },
      });
    }}
    />
  ),
});

export default FieldEntryDetailsScreen;
