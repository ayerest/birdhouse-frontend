import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as entriesActions from '../store/actions/entries'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

// TODO: refactor ternary statement in jsx
// TODO: refactor stylesheet and move to another file
// TODO: import individual icons instead of the whole package


const SharedEntries = props => {

    const dispatch = useDispatch();

    const dismissHandler = async () => {
        props.hideOnMap();
        dispatch(entriesActions.dismissSharedEntries());
    }

    const mapViewHandler = async () => {
        props.showOnMap();
    }

    const sharedEntries = useSelector(state => {
        return state.entries.sharedEntries;
    })

    return (
        <View style={styles.notificationBar}>
            <View></View>
            <View style={styles.center}>
                {sharedEntries.length > 1 ? 
                    <Text style={styles.text}>{sharedEntries.length} new Bird Alerts!</Text> : <Text style={styles.text}>{sharedEntries.length} new Bird Alert!</Text>}

                <Button title="Show on Map" onPress={mapViewHandler} />
            </View>
            <TouchableOpacity style={styles.icon} onPress={dismissHandler}>
                <Feather name="x-square" color={"red"} size={30}  />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    notificationBar: {
        backgroundColor: "thistle",
        // borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, 
    text: {
        fontFamily: 'Roboto-Condensed',
        fontSize: 18,
        padding: 2,
        alignSelf: 'center'
    }
})

export default SharedEntries;