import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';
import * as entriesActions from '../store/actions/entries'


const SharedEntries = props => {

    

    const dismissHandler = async () => {
        dispatch(entriesActions.dismissSharedEntries())
    }

    const mapViewHandler = async () => {
        console.log(props, "in map view")
        props.showOnMap()
       
    }


    return (
        <View style={styles.notificationBar}>
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