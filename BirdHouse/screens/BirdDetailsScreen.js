import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity, Platform, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import uuid from 'uuid';
import * as birdsActions from '../store/actions/birds';

const BirdDetailsScreen = props => {

    const dispatch = useDispatch();

    useEffect(() => {
        const loadBird = async () => {
            // let birdId = props.navigation.birdId
            const birdId = props.navigation.getParam('birdId')
            console.log(props, "props in bird details")
            console.log(birdId)
            dispatch(birdsActions.getBird(birdId));
        }
        loadBird();
    }, [dispatch, singleBird]);

    const singleBird = useSelector(state => {
        // console.log(state.birds.singleBird, "single bird")
        return state.birds.singleBird
    })
    return (
        <View style={styles.screen}>
            <ScrollView>
                <Text>The Bird Details Screen!</Text>
                
                <View>
                    <Text>{singleBird.common_name}</Text>
                    <Image style={styles.image} source={{uri: singleBird.img_url}}></Image>
                    <Text>{singleBird.details}</Text>
                </View>
                
                <Button title="Go Back" onPress={() => {props.navigation.goBack()}} />
            </ScrollView>
        </View>
    )
}

BirdDetailsScreen.navigationOptions = (navigationData) => {
    // console.log(navigationData)
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
    image: {
        height: 200,
        width: 200
    }
})

export default BirdDetailsScreen;