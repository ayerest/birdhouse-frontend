import React from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Card from './Card';
import * as audioActions from '../store/actions/audio';
import Colors from '../constants/Colors';
import BirdIcon from '../assets/images/birdicon.png';

// TODO: refactor stylesheet and move to another file

const styles = StyleSheet.create({
  card: {
    height: Dimensions.get('window').height * 0.4,
    width: Dimensions.get('window').width * 0.7,
    alignContent: 'center',
  },
  center: {
    alignSelf: 'center',
  },
  stockimage: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.22,
  },
  image: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.25,
    borderRadius: 10,
  },
  smallFont: {
    fontSize: 14,
    fontFamily: 'Roboto-Condensed',
  },
});

const BirdCard = (props) => {
  const { bird, commonName, scientificName } = props;
  const dispatch = useDispatch();

  const myBirds = useSelector((state) => state.birds.myBirds);

  const birdIds = myBirds.map((birdie) => birdie.id);

  const handlePlayAudio = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync({ uri: bird.item.birdcall });
      await dispatch(audioActions.playAudio(soundObject));
    } catch (error) {
      // An error occurred!
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.center}>
        {birdIds.indexOf(bird.item.id) >= 0
          ? <Image style={styles.image} source={{ uri: bird.item.img_url }} />
          : <Image style={styles.stockimage} source={BirdIcon} />}
        <TouchableOpacity onPress={handlePlayAudio}>
          <Feather style={styles.center} name="volume-2" size={30} color={Colors.linkColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <Text style={styles.smallFont}>{commonName}</Text>
        <Text style={styles.smallFont}>{scientificName}</Text>
      </View>
    </Card>
  );
};

BirdCard.defaultProps = {
  bird: '',
  commonName: '',
  scientificName: '',
};

BirdCard.propTypes = {
  bird: PropTypes.instanceOf(Object),
  commonName: PropTypes.string,
  scientificName: PropTypes.string,
};

export default BirdCard;
