import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View, Text, StyleSheet, Platform, FlatList, Image,
  ActivityIndicator, TouchableOpacity, Button, Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import MenuButton from '../components/MenuButton';
import Colors from '../constants/Colors';
import { getMyPhotos } from '../store/actions/photos';
import { getMyEntries } from '../store/actions/entries';
import AvatarButton from '../components/AvatarButton';
import Card from '../components/Card';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 15,
  },
  image: {
    height: 300,
    width: '100%',
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
    let mounted = true;
    if (mounted) {
      const loadMyFieldEntries = async () => {
        setEntriesLoading(true);
        await dispatch(getMyEntries());
        setEntriesLoading(false);
      };
      loadMyFieldEntries();
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const renderPhotoItem = (image) => {
    const thisPhotosEntry = myEntries.find((entry) => entry.id === image.item.field_entry_id);
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
        <Card>
          <Image style={styles.image} source={{ uri: image.item.img_url }} />
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
      {!photosLoading && !entriesLoading && !photosList
      && <Text style={styles.label}>You haven`&apos;`t taken any photos yet!</Text>}
      {!photosLoading && !entriesLoading && photosList
            && (
            <View>
              <View style={styles.row}>
                <Button title="Older" onPress={loadMorePhotos} />
                {displayIndex > 0 ? <Button title="Recent" onPress={loadRecentPhotos} /> : null}
              </View>
              <FlatList
                keyExtractor={() => uuid()}
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

export const screenOptions = (navData) => ({
  headerTitle: 'My Photos',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={MenuButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
        onPress={() => { navData.navigation.toggleDrawer(); }}
      />
    </HeaderButtons>
  ),
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

export default PicturesScreen;
