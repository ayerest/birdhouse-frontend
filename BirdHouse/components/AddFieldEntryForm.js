import React, {useState, useEffect} from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Modal, FlatList, TouchableOpacity, Image, Switch, TouchableWithoutFeedback} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import TakePicture from './TakePicture';
import CalendarPicker from 'react-native-calendar-picker';
import * as entriesActions from '../store/actions/entries';
import SearchBar from './SearchBar';
import uuid from 'uuid';
import { Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Card from './Card';
import SafeAreaView from 'react-native-safe-area-view';
import { Entypo } from '@expo/vector-icons';
import * as audioActions from '../store/actions/audio';





const AddFieldEntryForm = props => {

    useEffect(() => {
        
    }, [modalVisible]);

    const [image, setImage] = useState(false);
    const [notes, setNotes] = useState();
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [bird, setBird] = useState();
    const [modalVisible, setModalVisible] = useState(props.visible);
    const [share, setShare] = useState(false);

    const dispatch = useDispatch();

    const date = new Date()

    const submitHandler = async () => {
    
        let latitude = props.navigation.state.params.coords.latitude
        let longitude = props.navigation.state.params.coords.longitude
        await dispatch(entriesActions.postNewEntry(date, bird, notes, image, latitude, longitude, share))
        setImage(false);
        setShare(false);
        setNotes();
        setBird();
        setShowSearchResults(false);
        if (audio) {

            await audio.stopAsync();
        }
        props.navigation.goBack();
    }

    const imageSelectedHandler = (image) => {
        setImage(image)
    }

    const audio = useSelector(state => {
        return state.audio.currentSound
    })

    const filteredBirds = useSelector(state => {
        return state.birds.filteredBirds
    })

    const displayBirdList = (test=true) => {
        test === false ? setShowSearchResults(false) :
        setShowSearchResults(true)
    }

    const renderBirdListItem = (bird) => {
        return (
            <TouchableOpacity style={styles.searchResults} onPress={() => setBird(bird.item)}>
                <Text >
                  {bird.item.common_name}
                </Text>
            </TouchableOpacity>
        )
    }

    const handlePlayAudio = async () => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync({ uri: bird.birdcall });
            // handlePlayingMultiAudio(soundObject)
            await dispatch(audioActions.playAudio(soundObject))
            // Your sound is playing!
        } catch (error) {
            // An error occurred!
        }
    }

    const handleShareToggle = (value) => {
        setShare(!share)
    }

    const handleComingBack = () => {
        setModalVisible(true);
    }

    const handleBackButtonClick = async () => {
        if (audio) {

            await audio.stopAsync();
        }
        props.navigation.goBack()
    }

    const handleUnsetBird = async () => {
        if (audio) {
        await audio.stopAsync();
        }
        setBird();
    }

    const handleLeaveForBirdDetails = async () => {
        if (audio) {
        await audio.stopAsync();
        }
        props.navigation.navigate({
            routeName: 'BirdInfo', params: {
                birdId: bird.id,
                birdName: bird.common_name,
                onComingBack: handleComingBack
            }
        })
    }

    return (
        <ScrollView>
                <SafeAreaView>
                    <View style={styles.formtop}>
                        <Text style={styles.label}>Add New Field Entry</Text>
                    <Feather name="x-square" color={"red"} size={25} onPress={handleBackButtonClick}/>
                    </View>
                    <Text style={styles.label}>{date.toISOString().slice(0, 16).split("T").join(" ")}</Text>
                </SafeAreaView>
                <ScrollView>
                    <View style={styles.formtop}>
                        <Text style={styles.label}>Share Sighting?</Text>
                        <Switch style={styles.share} value={share} onValueChange={handleShareToggle}/>
                    </View>
                    <View style={styles.form}>
                        <SearchBar onShowBirds={displayBirdList}/>
                        {!!bird ? 
                            <View>
                                <Text>Selected Bird:</Text>
                                <Card>
                                    <View style={styles.row}>
                                        <Text>{bird.common_name}</Text>
                                        <Feather name="volume-2" size={25} onPress={handlePlayAudio} />
                                    </View>
                                    <TouchableOpacity onPress={handleLeaveForBirdDetails}>
                                        <Image style={styles.birdie} source={{uri: bird.img_url}} />
                                    </TouchableOpacity>
                                    <Feather name="x-square" size={25} color={"red"} onPress={handleUnsetBird} />
                                </Card>
                            </View> 
                        : null }
                    </View>
                    {showSearchResults ? <FlatList keyExtractor={(item, index) => uuid()} data={filteredBirds} renderItem={renderBirdListItem}
                        maxToRenderPerBatch={20} numColumns={1} /> : null}
                    <View style={styles.row}>
                        <Text style={styles.label}>Notes</Text>
                        <Entypo name="feather" color={"green"} size={25} />
                    </View>
                <TouchableWithoutFeedback>
                    <View>
                        <TextInput multiline={true}
                        numberOfLines={5} style={styles.textInput} value={notes} onChangeText={(text) => {setNotes(text)}}/>
                        <TakePicture style={styles.imagePicker} onImageSelected={imageSelectedHandler} />
                    </View>
                </TouchableWithoutFeedback>
                <Button title="Submit Entry" onPress={submitHandler} />
                </ScrollView>
        </ScrollView>
    )
}

AddFieldEntryForm.navigationOptions = (navigationData) => {
    // const bird_id = navigationData.navigation.getParam('birdId')
    // const bird_name = navigationData.navigation.getParam('birdName')

    return {
        headerTitle: "Add Field Entry",
    }
}

const styles = StyleSheet.create({
    form: {
        justifyContent: 'center',
    },
    formView: {
        justifyContent: 'center'
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        alignSelf: "center"
    },
    textInput: {
        height: 120,
        width: '90%',
        backgroundColor: "ghostwhite",
        alignSelf: "center",
        borderWidth: 1,
        marginTop: 5
    },
    formtop: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center",
        // paddingTop: 60
    },
    birdie: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderRadius: 10
    },
    imagePicker: {
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center",
    },
    searchResults: {
        alignItems: 'flex-start',
        marginLeft: 10,
        padding: 5,
        backgroundColor: "ghostwhite"
    },
    share: {
        alignSelf: "center"
    }
})

export default AddFieldEntryForm;