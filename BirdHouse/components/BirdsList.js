import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';
import uuid from 'uuid';
import BirdCard from './BirdCard'

const BirdsList = (props) => {

    const birdList = props.birdList

    const renderBirdGridItem = (bird) => {
        console.log("bird ", bird)
        return (

            <BirdCard bird={bird} common_name={bird.item.common_name} scientific_name={bird.item.species_name} onPress={() => {
                props.navigation.navigate({
                    routeName: 'BirdDetails', params: {
                        birdName: bird.item.common_name,
                        birdId: bird.item.id.toString(),
                        bird: bird
                    }
                })
            }} />

        )
    }

    return (
        <View>
            {/* <Button title="Go Back" onPress={() => { props.navigation.goBack() }} /> */}

            <FlatList keyExtractor={(item, index) => uuid()} data={birdList} renderItem={renderBirdGridItem}
                maxToRenderPerBatch={20} numColumns={2} />
        </View>
    )
} 


BirdsList.navigationOptions = (navigationData) => {
    // console.log(navigationData)
    // const bird_id = navigationData.navigation.getParam('birdId')
    // const bird_name = navigationData.navigation.getParam('birdName')

    return {
        headerTitle: "View Birds",
    }
}

export default BirdsList;