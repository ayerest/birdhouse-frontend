import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Colors from '../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import * as birdsActions from '../store/actions/birds';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import {MenuButton} from '../components/MenuButton'



const BirdODexScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState();
    const dispatch = useDispatch();
    
    useEffect(() => {
        const loadBirds = async () => {
            setError(null);
            setIsLoading(true);
            try {
                dispatch(birdsActions.fetchBirds());
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        }
        loadBirds();
    }, [dispatch]);

    // useEffect(() => {
    //     const listener = props.navigation.addListener('willFocus', loadBirds);
    //     return () => {
    //         listener.remove();
    //     }
    // }, [loadBirds])
    
    
    const birdList = useSelector(state => {
        return state.birds.birds
    })

    const renderBirdGridItem = (bird) => {
        console.log("common name", bird)
        // debugger
            return (
                <TouchableOpacity
                    style={styles.gridItem}
                    onPress={() => {props.navigation.navigate({routeName: 'BirdDetails', params: {
                        birdId: bird.item.id.toString()
                    }})}}>
                    <View style={styles.test}>
                        <Text>{bird.item.common_name}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    if (error) {
        return <View style={styles.screen}><Text>An Error occurred!</Text>
        </View> 
    }
    // if (isLoading) {
    //     return <View style={styles.screen}><ActivityIndicator size='large' color={Colors.tintColor}/></View>
    // }
    return (
        <View style={styles.screen}>
            <FlatList keyExtractor={bird => bird.id} data={birdList} renderItem={renderBirdGridItem} numColumns={2}/>
            <Text>The BirdODex Screen!</Text>
            {isLoading ? <View style={styles.screen}><ActivityIndicator size='large' color={Colors.tintColor} /></View> : <Text>Sup</Text>}
            {/* <Button title="Go to Bird Details!" onPress={() => {props.navigation.navigate({routeName: 'BirdDetails'})}}/> */}
        </View>
    )
}

BirdODexScreen.navigationOptions = navData => {
    return {
        headerTitle: "BirdODex",
        headerStyle: {
            backgroundColor: Platform.OS === "ios" ? Colors.myColor : "thistle",
            color: "black"
        },
        headerLeft: <HeaderButtons HeaderButtonComponent={MenuButton}>
            <Item title="Menu" iconName={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
                onPress={() => { navData.navigation.toggleDrawer() }} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen: {
        // flex: 1,
    },
    gridItem: {
        // flex: 1,
        // margin: 15,
        // height: 150
    },
    test: {
        // color: "black",
        // width: 100,
        // height: 100
    }
})

export default BirdODexScreen;