import React from 'react';
import { ScrollView, View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';
import uuid from 'uuid';
import BirdCard from './BirdCard';

const BirdsList = (props) => {

    const birdList = props.birdList
    
    const renderBirdGridItem = (bird) => {
        // console.log(props.navigation, "what is available?")
        return (

            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'BirdDetails', params: {
                            birdId: bird.item.id,
                            birdName: bird.item.common_name,
                        }
                    })
                }}
            >
                <BirdCard bird={bird} common_name={bird.item.common_name} scientific_name={bird.item.species_name} />
            </TouchableOpacity>

        )
    }

    const renderFooter = () => {
        return (
            <View>
                <Text>------------------------------</Text>
            </View>

        )
    }

    return (

            <View>
                {/* <Button title="Go Back" onPress={() => { props.navigation.goBack() }} /> */}

            <FlatList contentContainerStyle={{
                paddingBottom: 50
            }} keyExtractor={(item, index) => uuid()} data={birdList} renderItem={renderBirdGridItem}
                numColumns={2}
            />
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

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    margin: {
        marginBottom: 100
    },
    stockimage: {
        width: 50,
        height: 50
    },
    image: {
        width: 150,
        height: 150
    }
});

export default BirdsList;