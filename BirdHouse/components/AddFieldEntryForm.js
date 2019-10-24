import React, {useState, useEffect} from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Image, Switch, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Dimensions} from 'react-native';
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
import { NavigationEvents } from 'react-navigation';



const AddFieldEntryForm = props => {

    useEffect(() => {
        
    }, [modalVisible]);

    const [image, setImage] = useState(false);
    const [notes, setNotes] = useState();
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [bird, setBird] = useState();
    const [modalVisible, setModalVisible] = useState(props.visible);
    const [share, setShare] = useState(false);
    const [error, setError] = useState()
    const [confirmed, setConfirmed] = useState(false)

    const dispatch = useDispatch();

    const fullDate = new Date().toISOString().slice(0, 18).split("T")
    const date = fullDate[0]
    let time = fullDate[1].toString()
    let hour = parseInt(fullDate[1].split(":")[0])
    if (hour < 12) {
        time = (hour.toString() + ":" + fullDate[1].split(":")[1] + "AM")
    } else {
        time = (hour - 12).toString() + ":" + fullDate[1].split(":")[1] + "PM";
    }

    const submitHandler = async () => {
    
        let latitude = props.navigation.state.params.coords.latitude
        let longitude = props.navigation.state.params.coords.longitude
        try {
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
        } catch (err) {
            // An error occurred!
            setError(err.message)
            Alert.alert("You must select a bird using the search bar to submit your entry.")
        }
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

    const selectThatBird = (bird) => {
        setBird(bird);
        setConfirmed(false);
    }

    const renderBirdListItem = (bird) => {
        return (
            <TouchableOpacity style={styles.searchResults} onPress={() => selectThatBird(bird.item)}>
                <Text style={styles.label}>
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
        setConfirmed(false);
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
    // safeareaview should always wrap top most view (top most of the whole thing (app view?))
    //nav actually takes care of it for you
    // scrollview wraps keyboardavoiding wraps touchablewithoutfeedback
    // padding works better for android and position works best for ios with keyboardavoiding
    // use position with keyboardvertical offset to move field up
    return (
        <ScrollView>
                <NavigationEvents
                    onWillBlur={handleUnsetBird}
                />
        <KeyboardAvoidingView behavior="positon" style={{flex: 1}} keyboardVerticalOffset={50}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>

                <View style={styles.space}>
                    <Text style={styles.label}>{date}</Text>
                    <Feather name="x-square" color={"red"} size={35} onPress={handleBackButtonClick}/>
                </View>
              
                        <View >
                            <View style={styles.formtop}>
                                <Text style={styles.label}>Share Sighting?</Text>
                                <Switch style={styles.share} value={share} onValueChange={handleShareToggle}/>
                            </View>

                            <View style={styles.form}>
                                <SearchBar style={{marginVertical: 10}}onShowBirds={displayBirdList}/>
                            </View>

                        </View>
                    <View></View>
                        {!!bird ? 
                            <View>
                                <View >
                                    <Text style={styles.label}>Selected Bird:</Text>
                                </View>
                                { confirmed ? 
                                <View style={styles.row}>
                                <Text style={styles.label}>{bird.common_name}</Text>
                                    <Feather name="x-square" color={"red"} size={25} onPress={() => {
                                        setBird()
                                        setConfirmed(false)
                                        }} />
                                </View> : 
                                <Card>
                                    <View style={styles.row}>
                                        <Text style={styles.label}>{bird.common_name}</Text>
                                        <Feather name="volume-2" size={25} onPress={handlePlayAudio} />
                                    </View>
                                    <TouchableOpacity onPress={handleLeaveForBirdDetails}>
                                        <Image style={styles.birdie} source={{uri: bird.img_url}} />
                                        </TouchableOpacity>
                                    <View style={styles.spaceEven}>
                                        <TouchableOpacity onPress={() => {
                                            setConfirmed(true);
                                            setShowSearchResults(false);
                                        }}>
                                            <Feather name="check-square" size={25} color={"green"} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleUnsetBird}>
                                            <Feather name="x-square" size={25} color={"red"} />
                                        </TouchableOpacity>
                                    </View>
                                </Card> }
                            </View> 
                        : null }
                    {showSearchResults ?
                    <View style={{flex: 1}}>
                        <FlatList keyExtractor={(item, index) => uuid()} data={filteredBirds} renderItem={renderBirdListItem}
                            numColumns={1} />
                    </View>
                    : null}

                        <View style={styles.inner}>

                        <View style={styles.row}>
                            <Text style={styles.label}>Notes</Text>
                            <Entypo name="feather" color={"green"} size={25} />
                        </View>
                                <View>
                                    <TextInput multiline={true}
                                    numberOfLines={5} style={styles.textInput} placeholder="Enter notes for your sighting" value={notes} onFocus={()=> {
                                        setShowSearchResults(false)
                                        setConfirmed(true)
                                        }} onChangeText={(text) => {setNotes(text)}}/>
                                    <TakePicture style={styles.imagePicker} onImageSelected={imageSelectedHandler} />
                        
                                </View>
                        </View>
                <Button title="Submit Entry" onPress={submitHandler} />
                {/* {error ? <Text>{error}</Text> : null} */}
                <View style={{flex: 1, paddingBottom: 100}} ></View>
            </View>
        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
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
        marginRight: 10,
        alignSelf: "center",
        fontFamily: 'Roboto-Condensed',
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
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        marginLeft: '4%'
        // paddingTop: 60
    },
    birdie: {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 4,
        alignSelf: 'center',
        borderRadius: 10
    },
    imagePicker: {
        alignItems: "center",
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 3,
    },
    row: {
        flexDirection: "row",
        justifyContent: 'center',
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
    },
    space: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '4%',
        // marginVertical: '%',
        flex: 1
    },
    spaceEven: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginHorizontal: '4%',
        marginVertical: '2%',
    },
    inner: {
        justifyContent: 'flex-end'
    }
})

export default AddFieldEntryForm;