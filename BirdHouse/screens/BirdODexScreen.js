import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Platform } from 'react-native';
import Colors from '../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import * as birdsActions from '../store/actions/birds'

const BirdODexScreen = props => {
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(birdsActions.fetchBirds())
    }, [dispatch]);
    
    
    const birdList = useSelector(state => {
        return state.birds.birds
    })

    const renderBirdGridItem = (birdList) => {
        birdList.each(bird => {

            return (
                
                <TouchableOpacity
                    style={styles.gridItem}
                    onPress={() => {props.navigation.navigate({routeName: 'BirdDetails', params: {
                        birdId: "test"
                    }})}}>
                    <View>
                        <Text>{bird.common_name}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }
    return (
        <View style={styles.screen}>
            <FlatList data={birdList} renderItem={renderBirdGridItem}numColumns={2}/>
            <Text>The BirdODex Screen!</Text>
            {/* <Button title="Go to Bird Details!" onPress={() => {props.navigation.navigate({routeName: 'BirdDetails'})}}/> */}
        </View>
    )
}

BirdODexScreen.navigationOptions = {
    headerTitle: 'BirdODex',
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150
    }
})

export default BirdODexScreen;