import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const BirdDetailsScreen = props => {
    const bird_id = props.navigation.getParam('birdId')
    return (
        <View style={styles.screen}>
            <Text>The Bird Details Screen!</Text>
            <Button title="Go Back" onPress={() => {props.navigation.goBack()}} />
        </View>
    )
}

BirdDetailsScreen.navigationOptions = (navigationData) => {
    // console.log(navigationData)
    const bird_id = navigationData.navigation.getParam('birdId')
    return {
        headerTitle: bird_id,
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default BirdDetailsScreen;