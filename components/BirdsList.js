import React from 'react';
import {
  View, Button, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import BirdCard from './BirdCard';
import * as audioActions from '../store/actions/audio';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  margin: {
    marginBottom: 100,
  },
  stockimage: {
    width: 50,
    height: 50,
  },
  image: {
    width: 150,
    height: 150,
  },
  gridItem: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

const BirdsList = (props) => {
  const { birdList } = props;
  const dispatch = useDispatch();

  const renderBirdGridItem = (bird) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => {
        props.navigation.navigate({
          name: 'Bird Details',
          params: {
            birdId: bird.item.id,
            birdName: bird.item.common_name,
          },
        });
      }}
    >
      <BirdCard
        bird={bird}
        commonName={bird.item.common_name}
        scientificName={bird.item.species_name}
      />
    </TouchableOpacity>
  );

  const audio = useSelector((state) => state.audio.currentSound);

  const handleBackButtonPress = async () => {
    if (audio) {
      await audio.stopAsync();
      dispatch(audioActions.stopAudio);
    }
    props.onShowBirds(false);
  };

  return (
    <View>
      <Button title="Back" onPress={handleBackButtonPress} />
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={() => uuid()}
        data={birdList}
        renderItem={renderBirdGridItem}
        numColumns={1}
      />
    </View>
  );
};

BirdsList.defaultProps = {
  onShowBirds: '',
  birdList: '',
  navigation: '',
};

BirdsList.propTypes = {
  onShowBirds: PropTypes.instanceOf(Function),
  birdList: PropTypes.instanceOf(Array),
  navigation: PropTypes.instanceOf(Object),
};

export default BirdsList;
