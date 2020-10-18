import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, FlatList,
  TouchableOpacity, Image, Switch, Keyboard, TouchableWithoutFeedback,
  KeyboardAvoidingView, Alert, Dimensions, SafeAreaView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { Feather, Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import moment from 'moment';
import TakePicture from './TakePicture';
import * as entriesActions from '../store/actions/entries';
import SearchBar from './SearchBar';
import Card from './Card';
import * as audioActions from '../store/actions/audio';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  form: {
    justifyContent: 'center',
  },
  formView: {
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginRight: 10,
    alignSelf: 'center',
    fontFamily: 'Roboto-Condensed',
  },
  textInput: {
    height: 120,
    width: '90%',
    backgroundColor: Colors.myColor,
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 5,
  },
  formtop: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: '4%',
  },
  birdie: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 4,
    alignSelf: 'center',
    borderRadius: 10,
  },
  imagePicker: {
    alignItems: 'center',
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResults: {
    alignItems: 'flex-start',
    marginLeft: 10,
    padding: 5,
    backgroundColor: Colors.myColor,
  },
  share: {
    alignSelf: 'center',
  },
  space: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '4%',
    flex: 1,
  },
  spaceEven: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: '4%',
    marginVertical: '2%',
  },
  inner: {
    justifyContent: 'flex-end',
  },
  audioIcon: {
    paddingBottom: 10,
  },
  card: {
    backgroundColor: Colors.myColor,
  },
});

const AddFieldEntryForm = ({ navigation, route }) => {
  const [image, setImage] = useState(false);
  const [notes, setNotes] = useState();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [bird, setBird] = useState(route.params.bird ? route.params.bird : null);
  const [share, setShare] = useState(false);
  const [error, setError] = useState();
  const [confirmed, setConfirmed] = useState(false);
  const audio = useSelector((state) => state.audio.currentSound);

  const handleUnsetBird = async () => {
    if (audio) {
      await audio.stopAsync();
    }
    setBird();
    setConfirmed(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      handleUnsetBird();
    });

    return unsubscribe;
  });

  const dispatch = useDispatch();

  const fullDate = moment().format('MMMM Do YYYY, h:mm:ss a');

  const submitHandler = async () => {
    const lat = route.params.coords.latitude || route.params.coords.lat;
    const long = route.params.coords.longitude || route.params.coords.lng;
    try {
      await dispatch(entriesActions.postNewEntry(fullDate, bird, notes, image, lat, long, share));
      setImage(false);
      setShare(false);
      setNotes();
      setBird();
      setShowSearchResults(false);
      if (audio) {
        await audio.stopAsync();
      }
      navigation.goBack();
    } catch (err) {
      setError(err.message);
      Alert.alert('You must select a bird using the search bar to submit your entry and enter notes for your sighting.', error);
    }
  };

  const imageSelectedHandler = (myImage) => {
    setImage(myImage);
  };

  const filteredBirds = useSelector((state) => state.birds.filteredBirds);

  const displayBirdList = (display = true) => {
    display ? setShowSearchResults(true) : setShowSearchResults(false);
  };

  const selectThatBird = (myBird) => {
    setBird(myBird);
    setConfirmed(false);
  };

  const renderBirdListItem = (myBird) => (
    <TouchableOpacity style={styles.searchResults} onPress={() => selectThatBird(myBird.item)}>
      <Text style={styles.label}>
        {myBird.item.common_name}
      </Text>
    </TouchableOpacity>
  );

  const handlePlayAudio = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync({ uri: bird.birdcall });
      // handlePlayingMultiAudio(soundObject)
      await dispatch(audioActions.playAudio(soundObject));
      // Your sound is playing!
    } catch (err) {
      // An error occurred!
      Alert.alert(error);
    }
  };

  const handleShareToggle = () => {
    setShare(!share);
  };

  const handleBackButtonClick = async () => {
    if (audio) {
      await audio.stopAsync();
    }
    navigation.goBack();
  };

  const handleConfirmBird = async () => {
    if (audio) {
      await audio.stopAsync();
    }
    setConfirmed(true);
    setShowSearchResults(false);
  };

  const handleLeaveForBirdDetails = async () => {
    if (audio) {
      await audio.stopAsync();
    }
    navigation.navigate({
      name: 'Bird Details',
      params: {
        birdId: bird.id,
        birdName: bird.common_name,
        // onComingBack: handleComingBack
      },
    });
  };
  // safeareaview should always wrap top most view (top most of the whole thing (app view?))
  // nav actually takes care of it for you
  // scrollview wraps keyboardavoiding wraps touchablewithoutfeedback
  // padding works better for android and position works best for ios with keyboardavoiding
  // use position with keyboardvertical offset to move field up
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="positon" style={{ flex: 1 }} keyboardVerticalOffset={50}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View style={styles.space}>
              <Text style={styles.label}>{fullDate}</Text>
              <Feather name="x-square" color="red" size={35} onPress={handleBackButtonClick} />
            </View>
            <View style={styles.formtop}>
              <Text style={styles.label}>Share Sighting?</Text>
              <Switch style={styles.share} value={share} onValueChange={handleShareToggle} />
            </View>
            <View>
              <View style={styles.form}>
                <SearchBar style={{ marginVertical: 10 }} onShowBirds={displayBirdList} />
              </View>
            </View>
            <View />
            {bird ? (
              <View>
                <View>
                  <Text style={styles.label}>Selected Bird:</Text>
                </View>
                { confirmed
                  ? (
                    <View style={styles.row}>
                      <Text style={styles.label}>{bird.common_name}</Text>
                      <Feather
                        name="x-square"
                        color="red"
                        size={30}
                        onPress={() => {
                          setBird();
                          setConfirmed(false);
                        }}
                      />
                    </View>
                  )
                  : (
                    <Card style={styles.card}>
                      <View style={styles.row}>
                        <Text style={styles.label}>{bird.common_name}</Text>
                        <Feather style={styles.audioIcon} name="volume-2" size={30} onPress={handlePlayAudio} color={Colors.linkColor} />
                      </View>
                      <TouchableOpacity onPress={handleLeaveForBirdDetails}>
                        <Image style={styles.birdie} source={{ uri: bird.img_url }} />
                      </TouchableOpacity>
                      <View style={styles.spaceEven}>
                        <TouchableOpacity onPress={handleConfirmBird}>
                          <Feather name="check-square" size={30} color="green" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleUnsetBird}>
                          <Feather name="x-square" size={30} color="red" />
                        </TouchableOpacity>
                      </View>
                    </Card>
                  ) }
              </View>
            )
              : null }
            {showSearchResults
              && (
                <View style={{ flex: 1 }}>
                  <FlatList
                    keyExtractor={() => uuid()}
                    data={filteredBirds}
                    renderItem={renderBirdListItem}
                    numColumns={1}
                  />
                </View>
              )}
            <View style={styles.inner}>
              <View style={styles.row}>
                <Text style={styles.label}>Notes</Text>
                <Entypo name="feather" color="green" size={30} />
              </View>
              <View>
                <TextInput
                  multiline
                  numberOfLines={5}
                  style={styles.textInput}
                  placeholder="Enter notes for your sighting"
                  value={notes}
                  onFocus={() => {
                    setShowSearchResults(false);
                    setConfirmed(true);
                  }}
                  onChangeText={(text) => { setNotes(text); }}
                />
                <TakePicture style={styles.imagePicker} onImageSelected={imageSelectedHandler} />

              </View>
            </View>
            <Button title="Submit Entry" onPress={submitHandler} />
            <View style={{ flex: 1, paddingBottom: 100 }} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

AddFieldEntryForm.defaultProps = {
  navigation: '',
  route: '',
};

AddFieldEntryForm.propTypes = {
  navigation: PropTypes.instanceOf(Object),
  route: PropTypes.instanceOf(Object),
};

export default AddFieldEntryForm;
