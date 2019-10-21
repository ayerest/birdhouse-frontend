import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as entriesActions from '../store/actions/entries'


const SharedEntries = props => {

    const dispatch = useDispatch();

    const dismissHandler = async () => {
        props.hideOnMap()
        dispatch(entriesActions.dismissSharedEntries())
    }

    const mapViewHandler = async () => {
        console.log(props, "in map view")
        props.showOnMap()
       
    }


    return (
        <View style={styles.notificationBar}>
            <Text>Bird Alerts!</Text>
            <Button title="Dismiss" onPress={dismissHandler} />
            <Button title="Show on Map" onPress={mapViewHandler} />
        </View>
    )

}

const styles = StyleSheet.create({
    notificationBar: {
        borderWidth: 2,
        backgroundColor: "thistle"
    }
})

export default SharedEntries;