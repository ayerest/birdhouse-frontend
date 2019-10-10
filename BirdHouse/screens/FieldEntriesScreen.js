import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const FieldEntriesScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The Field Entries Screen!</Text>
            <Button title="Go to Details" onPress={() => {props.navigation.navigate({routeName: 'FieldEntry'})}}/>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FieldEntriesScreen;