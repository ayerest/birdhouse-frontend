import React, {useState} from 'react';
import {ScrollView, View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImageSelector from './ImageSelector';
import CalendarPicker from 'react-native-calendar-picker';
import * as entriesActions from '../store/actions/entries';
import SearchBar from './SearchBar'


const AddFieldEntryForm = props => {
    // useState to get form data
    const [image, setImage] = useState(false)
    const [notes, setNotes] = useState()
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [bird, setBird] = useState()
    const dispatch = useDispatch();

    const formChangeHandler = text => {
        //set state here
        //notes to self: no longer using calendar picker on inital form load
        //for mvp just display today's date at the top of the form
        //stretch goal will be that the date is clickable and pops up calendar to edit
    }

    const submitHandler = async () => {
        //dispatch stuff in here);
        //could throw in a props.navigation.goBack() here if I want to go back a page, not sure how form will work yet though - modal or new page
            // await dispatch(entriesActions.postNewEntry(date, notes, newImage, user, latitude, longitude))
            // setNewImage(false)
            // setIsLoading(false);
            // props.navigation.navigate('Menu');
    }

    const imageSelectedHandler = (image) => {
        setImage(image)
    }

    const filteredBirds = useSelector(state => {
        return state.birds.filteredBirds
    })

    const displayBirdList = () => {
        setShowSearchResults(true)
    }

    const renderBirdListItem = (bird) => {
        return (
            <TouchableOpacity onPress={() => setBird(bird.item)}>
                <Text>
                  {bird.item.common_name}  
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View stlye={styles.formtop}>
                    <Text style={styles.label}>Add New Field Entry</Text>
                    <Button title="Submit" onPress={() => {submitHandler}}/>
                </View>
                <Text style={styles.label}>Date: {new Date().toISOString().slice(0, 10)}</Text>
                <SearchBar onShowBirds={displayBirdList}/>
                {showSearchResults ? <FlatList keyExtractor={(item, index) => uuid()} data={filteredBirds} renderItem={renderBirdListItem}
                    maxToRenderPerBatch={20} numColumns={1} /> : null}
                <TextInput style={styles.textInput} onChangeText={() => {}}
                value={"Enter notes here"}/>
                <ImageSelector onImageSelected={imageSelectedHandler} />
                
                {/* <View style={styles.cal}>
                    <CalendarPicker />
                </View> */}
                <TextInput />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        margin: 25
    },
    label: {
        fontSize: 16,
        marginBottom: 15
    },
    textInput: {
        backgroundColor: "ghostwhite",
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    },
    cal: {
        width: 200
    },
    formtop: {
        flexDirection: "row"
    }
})

export default AddFieldEntryForm;