import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PicturesScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The Field Entries Screen!</Text>
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

export default PicturesScreen;