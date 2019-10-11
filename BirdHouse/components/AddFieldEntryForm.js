import React, {useState} from 'react';
import {ScrollView, View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
//don't forget to import action

const AddFieldEntryForm = props => {
    //useState to get form data

    const dispatch = useDispatch();

    const formChangeHandler = text => {
        //set state here
    }

    const submitHandler = () => {
        //dispatch stuff in here);
        //could throw in a props.navigation.goBack() here if I want to go back a page, not sure how form will work yet though - modal or new page
    }
    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Add New Field Entry</Text>
                //display location?
                <TextInput style={styles.textInput} onChangeText={() => {}}
                value={"test"}/> //live search bar for birds
                <TextInput /> //date picker
                <TextInput /> //notes field
                <TextInput /> //image picker
                <Button title="Submit" onPress={() => {}}/>
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
        borderBottomColor: "ghostwhite",
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
})

export default AddFieldEntryForm;