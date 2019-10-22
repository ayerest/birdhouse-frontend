import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as entriesActions from '../store/actions/entries'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';


const SharedEntries = props => {

    const dispatch = useDispatch();

    const dismissHandler = async () => {
        props.hideOnMap()
        dispatch(entriesActions.dismissSharedEntries())
    }

    const mapViewHandler = async () => {
        props.showOnMap()
       
    }

    const sharedEntries = useSelector(state => {
        return state.entries.sharedEntries
    })


    return (
        <View style={styles.notificationBar}>
            <View style={styles.row}>
                {sharedEntries.length > 1 ? 
                    <Text>{sharedEntries.length} new Bird Alerts!</Text> : <Text>{sharedEntries.length} new Bird Alert!</Text>}
                <TouchableOpacity onPress={dismissHandler}>
                    <Feather name="x-square" color={"red"} size={25}  />
                </TouchableOpacity>

            </View>
            <Button title="Show on Map" onPress={mapViewHandler} />
        </View>
    )

}

const styles = StyleSheet.create({
    notificationBar: {
        backgroundColor: "thistle"
    }, 
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
   
})

export default SharedEntries;