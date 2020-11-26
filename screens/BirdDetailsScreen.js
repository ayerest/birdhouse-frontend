import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions, Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'uuid';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import * as birdsActions from '../store/actions/birds';
import Card from '../components/Card';
import * as audioActions from '../store/actions/audio';
import AvatarButton from '../components/AvatarButton';
import Colors from '../constants/Colors';

// TODO: fix memory leak on first screen load
// TODO: refactor stylesheet and move to another file
// TODO: if you navigate away immediately after hitting play birdcall, the audio is not stopped
// TODO: think about using suspense for loading screens

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.myColor,
  },
  card: {
    backgroundColor: Colors.myColor,
  },
  image: {
    resizeMode: 'cover',
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width * 0.8,
    borderRadius: 10,
  },
  birdImage: {
    resizeMode: 'contain',
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width * 0.87,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  scrollText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  center: {
    alignSelf: 'center',
    margin: 10,
  },
  citation: {
    backgroundColor: 'thistle',
    padding: 10,
    borderRadius: 10,
    fontFamily: 'Roboto-Condensed',
    fontSize: 16,
  },
  heading: {
    fontFamily: 'Roboto-Condensed',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
  italic: {
    fontStyle: 'italic',
  },
  paragraph: {
    marginBottom: 20,
    fontFamily: 'Roboto-Condensed',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginRight: 10,
    alignSelf: 'center',
    fontFamily: 'Roboto-Condensed',
  },
  buttonLike: {
    color: Colors.linkColor,
    fontSize: 18,
    marginBottom: 5,
  },
});

const BirdDetailsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const myLocation = useSelector((state) => state.location.myLocation);
  const singleBird = useSelector((state) => state.birds.singleBird);
  const audio = useSelector((state) => state.audio.currentSound);

  useEffect(() => {
    const handleLeaving = async () => {
      if (audio) {
        await audio.stopAsync();
        await dispatch(audioActions.stopAudio);
      }
    };
    navigation.addListener('blur', handleLeaving);
  }, [navigation, audio, dispatch]);

  useEffect(() => {
    setIsLoading(true);
    const loadBird = async () => {
      const { birdId } = route.params;
      await dispatch(birdsActions.getBird(birdId));
      setIsLoading(false);
    };
    loadBird();
  }, [dispatch, route.params]);

  const handlePlayAudio = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync({ uri: singleBird.birdcall });
      await dispatch(audioActions.playAudio(soundObject));
    } catch (error) {
      Alert.alert(error);
    }
  };

  const renderDetails = () => {
    if (singleBird.details) {
      return singleBird.details.split('!PARAGRAPH!').map((paragraph) => <Text style={styles.paragraph} key={uuid()}>{paragraph}</Text>);
    }
  };

  const navToBirdForm = () => {
    navigation.navigate('My Sightings', {
      screen: 'Add Sighting',
      params: {
        visible: true,
        coords: myLocation,
        bird: singleBird,
      },
    });
  };

  return (
    <View style={styles.screen}>
      {isLoading && <ActivityIndicator size="large" color={Colors.linkColor} style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }} />}
      {!isLoading && (
        <ScrollView>
          <Card style={styles.card}>
            <ScrollView maximumZoomScale={2} horizontal contentContainerStyle={{ paddingRight: Dimensions.get('window').width * 0.2 }}>
              <View>
                <Image
                  style={styles.birdImage}
                  source={{ uri: singleBird.img_url }}
                />
                {singleBird.range_map && (
                  <View style={styles.scrollText}>
                    <Text style={styles.label}>
                      Scroll right to view geographic range map
                    </Text>
                    <Feather name="arrow-right" size={35} color={Colors.linkColor} />
                  </View>
                )}
              </View>
              {singleBird.range_map && <Image style={styles.image} source={{ uri: singleBird.range_map }} />}
            </ScrollView>
            <View style={styles.row}>
              <TouchableOpacity onPress={navToBirdForm}>
                <FontAwesomeIcon
                  icon={faBinoculars}
                  color={Colors.linkColor}
                  size={30}
                  style={styles.center}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather style={styles.center} name="volume-2" size={35} onPress={handlePlayAudio} color={Colors.linkColor} />
              </TouchableOpacity>
            </View>
            {renderDetails()}
            <View style={styles.citation}>
              <Text style={styles.heading}>Citation</Text>
              <Text style={styles.italic}>{singleBird.citation}</Text>
            </View>
          </Card>
        </ScrollView>
      )}
    </View>
  );
};

BirdDetailsScreen.defaultProps = {
  navigation: '',
  route: '',
};

BirdDetailsScreen.propTypes = {
  navigation: PropTypes.instanceOf(Object),
  route: PropTypes.instanceOf(Object),
};

export const screenOptions = (navData) => {
  const { birdName } = navData.route.params;
  return {
    headerTitle: birdName,
    headerTitleStyle: {
      fontFamily: 'Fred-Great',
      fontSize: 19,
      fontWeight: '400',
    },
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
  };
};

export default BirdDetailsScreen;
