import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

const BirdDetailsScreen = props => {
    // const bird_id = props.navigation.getParam('birdId')
    // console.log(props.navigation.getParam('bird'), "bird in the bird bird details")
    // console.log("---------------------------------")
    return (
        <View style={styles.screen}>
            <Text>The Bird Details Screen!</Text>
            <Text>{props.navigation.getParam('bird').item.common_name}</Text>
            <Image source={props.navigation.getParam("bird").item.img_url}></Image>
            <Button title="Go Back" onPress={() => {props.navigation.goBack()}} />
        </View>
    )
}

BirdDetailsScreen.navigationOptions = (navigationData) => {
    // console.log(navigationData)
    // const bird_id = navigationData.navigation.getParam('birdId')
    const bird_name = navigationData.navigation.getParam('birdName')

    return {
        headerTitle: bird_name,
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