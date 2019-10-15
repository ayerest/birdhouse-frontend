import React, {useState, useEffect} from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Modal, FlatList, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImageSelector from './ImageSelector';
import CalendarPicker from 'react-native-calendar-picker';
import * as entriesActions from '../store/actions/entries';
import SearchBar from './SearchBar';
import uuid from 'uuid';


const AddFieldEntryForm = props => {

    useEffect(() => {
        
    }, [modalVisible]);

    // useState to get form data
    const [image, setImage] = useState(false);
    const [notes, setNotes] = useState();
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [bird, setBird] = useState();
    const [modalVisible, setModalVisible] = useState(props.visible);
    const dispatch = useDispatch();

    const date = new Date()

    const submitHandler = async () => {
        //dispatch stuff in here);
        //could throw in a props.navigation.goBack() here if I want to go back a page, not sure how form will work yet though - modal or new page
        let latitude = props.coords.latitude
        let longitude = props.coords.longitude
        await dispatch(entriesActions.postNewEntry(date, bird, notes, image, latitude, longitude))
        setModalVisible(false)
            // props.navigation.navigate('Menu');
    }

    const imageSelectedHandler = (image) => {
        setImage(image)
    }

    const filteredBirds = useSelector(state => {
        return state.birds.filteredBirds
    })

    const displayBirdList = (test=true) => {
        test === false ? setShowSearchResults(false) :
        setShowSearchResults(true)
    }

    const renderBirdListItem = (bird) => {
        // note to self: pressing here could open a popup with information about the bird?
        return (
            <TouchableOpacity onPress={() => setBird(bird.item)}>
                <Text>
                  {bird.item.common_name}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
            <Modal animationType="slide" style={styles.form} visible={props.visible}>
                <ScrollView>
                    <View style={styles.formtop}>
                        <Text style={styles.label}>Add New Field Entry</Text>
                        <Button title="Submit" onPress={submitHandler}/>
                    </View>
                    <Text style={styles.label}>Date: {date.toISOString().slice(0, 10)}</Text>
                    <View style={styles.form}>
                        <SearchBar onShowBirds={displayBirdList}/>
                        {!!bird ? <View>
                                    <Text>Selected Bird: {bird.common_name}</Text>
                                    <Image style={styles.birdie} source={{uri: bird.img_url}} />
                                </View> 
                                : null }
                    </View>
                    {showSearchResults ? <FlatList keyExtractor={(item, index) => uuid()} data={filteredBirds} renderItem={renderBirdListItem}
                        maxToRenderPerBatch={20} numColumns={1} /> : null}
                    <Text style={styles.label}>Notes</Text>

                <TextInput multiline={true}
                    numberOfLines={8} style={styles.textInput} value={notes} onChangeText={(text) => {setNotes(text)}}/>
                    <ImageSelector onImageSelected={imageSelectedHandler} />
                    
                    {/* <View style={styles.cal}>
                        <CalendarPicker />
                    </View> */}
                    <Button title="Close Form"
                        onPress={() => {
                            props.onHandleModalClose()
                        }}/>
                </ScrollView>
            </Modal>
    )
}

const styles = StyleSheet.create({
    form: {
        padding: 100,
        justifyContent: 'center'
    },
    formView: {
        justifyContent: 'center'
    },
    label: {
        fontSize: 16,
        marginBottom: 15
    },
    textInput: {
        height: 250,
        width: '90%',
        backgroundColor: "ghostwhite",
        borderWidth: 1,
        marginTop: 20
    },
    cal: {
        width: 200
    },
    formtop: {
        flexDirection: "row",
        justifyContent: 'space-around',
        paddingTop: 50
    },
    birdie: {
        width: 100,
        height: 100
    }
})

export default AddFieldEntryForm;