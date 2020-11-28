import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View, Text, StyleSheet, FlatList, Image,
  ActivityIndicator, TouchableOpacity, Button, Alert, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';
import { getMyPhotos } from '../store/actions/photos';
import { getMyEntries } from '../store/actions/entries';
import Card from '../components/Card';
import moment from 'moment';


// TODO: fix antipattern in useeffect
// TODO: refactor stylesheet and move to another file

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: Colors.myColor,
  },
  card: {
    backgroundColor: Colors.myColor,
  },
  image: {
    height: 300,
    width: Dimensions.get('window').width * 0.9,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'black',
    resizeMode: 'cover',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginRight: 10,
    alignSelf: 'center',
    fontFamily: 'Roboto-Condensed',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
});

const PicturesScreen = ({ navigation }) => {
  const photosList = useSelector((state) => (state.photos.myPhotos || false));
  const myEntries = useSelector((state) => state.entries.entries);

  const [photosLoading, setPhotosLoading] = useState(false);
  const [entriesLoading, setEntriesLoading] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLeaving = () => {
      setDisplayIndex(0);
    };
    const unsubscribe = navigation.addListener('blur', () => {
      handleLeaving();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const loadMyPhotos = async () => {
      await dispatch(getMyPhotos());
      setPhotosLoading(false);
    };
    const handlePageLoad = () => {
      setPhotosLoading(true);
      loadMyPhotos();
    };
    const subscribe = navigation.addListener('focus', () => {
      handlePageLoad();
    });

    return subscribe;
  }, [dispatch, navigation]);

  useEffect(() => {
    setEntriesLoading(true);
    const loadMyFieldEntries = async () => {
      await dispatch(getMyEntries());
      setEntriesLoading(false);
    };
    loadMyFieldEntries();
  }, [dispatch]);

  const renderPhotoItem = (image) => {
    const thisPhotosEntry = myEntries.find((entry) => entry.id === image.item.field_entry_id);
    const entryDate = moment(thisPhotosEntry.date).format('MMMM Do YYYY, h:mm:ss a');
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          navigation.navigate({
            name: 'Bird Sighting',
            params: {
              entryId: thisPhotosEntry.id,
              entryName: `${thisPhotosEntry.date}`,
              entry: thisPhotosEntry,
            },
          });
        }}
      >
        <Card style={styles.card}>
          <Image style={styles.image} source={{ uri: image.item.img_url }} />
          <Text style={styles.label}>{thisPhotosEntry.bird.common_name}</Text>
          <Text style={styles.label}>{entryDate}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  const loadMorePhotos = async () => {
    const indexDiff = photosList.length - (displayIndex + 10);
    if (photosList.length < 10 || indexDiff === 0) {
      Alert.alert('You do not have any older photos.');
    } else if (indexDiff < 10) {
      setDisplayIndex(displayIndex + indexDiff);
    } else {
      setDisplayIndex(displayIndex + 10);
    }
  };

  const loadRecentPhotos = () => {
    setDisplayIndex(0);
  };

  return (
    <View style={styles.screen}>
      {photosLoading && entriesLoading && <ActivityIndicator size="large" color={Colors.linkColor} />}
      {!photosLoading && !entriesLoading && photosList.length === 0
      && <Text style={styles.label}>You haven&apos;t taken any photos yet!</Text>}
      {!photosLoading && !entriesLoading && photosList.length > 10
        && (
        <View>
          <View style={styles.row}>
            <Button title="Older" onPress={loadMorePhotos} />
            {displayIndex > 0 ? <Button title="Recent" onPress={loadRecentPhotos} /> : null}
          </View>
        </View>
        )}
      {!photosLoading && !entriesLoading && photosList.length > 0
        && (
        <View>
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={photosList.slice(displayIndex, displayIndex + 10)}
            renderItem={renderPhotoItem}
            numColumns={1}
          />
        </View>
      )}
    </View>
  );
};

PicturesScreen.defaultProps = {
  navigation: '',
};

PicturesScreen.propTypes = {
  navigation: PropTypes.instanceOf(Object),
};

export default PicturesScreen;
