import React, {useEffect, useState} from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Colors from '../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {MenuButton} from '../components/MenuButton';
import SearchBar from '../components/SearchBar';
import BirdsList from '../components/BirdsList'
import BirdCount from '../components/BirdCount';
import CategoriesList from '../components/CategoriesList';
import { NavigationEvents } from 'react-navigation';
import * as audioActions from '../store/actions/audio';




const BirdODexScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState();
    const [showBirds, setShowBirds] = useState(false)
    const [showMyBirdCount, setShowMyBirdCount] = useState(false);
    const [currentBirds, setCurrentBirds] = useState([])
    const dispatch = useDispatch();
    

    
    const filteredBirds = useSelector(state => {
        return state.birds.filteredBirds
    })
    
    const myBirds = useSelector(state => {
        return state.birds.myBirds
    })
    
    
    const categoryBirds = useSelector(state => {
        return state.birds.categoryBirds
    })
    
    // if (error) {
    //     return <View style={styles.screen}><Text>An Error occurred!</Text>
    //     </View> 
    // }
    // if (isLoading) {
    //     return <View style={styles.screen}><ActivityIndicator size='large' color={Colors.tintColor}/></View>
    // }
    const handleOnShowBirds = (type) => {
        setIsLoading(true)
        setCurrentBirds([]);
        setShowBirds(false);
        switch(type) {
            case false:
                setCurrentBirds([]);
                setShowBirds(false);
                setShowMyBirdCount(false);
                setIsLoading(false);
                return;
            case "mine":
                setCurrentBirds(myBirds);
                setShowBirds(true);
                setShowMyBirdCount(true);
                setIsLoading(false);
                return;
            case "search":
                setCurrentBirds(filteredBirds);
                setShowBirds(true);
                setIsLoading(false);
                return;
            case "category":
                setCurrentBirds(categoryBirds)              
                setShowBirds(true);
                setIsLoading(false);
                return;
            default:
                return;
        }
    }

    const handleGoBack = () => {
        setCurrentBirds([])
        setShowBirds(false)
    } 
    const audio = useSelector(state => {
        return state.audio.currentSound
    })

    const handleLeaving = async () => {
        if (audio) {
            await audio.stopAsync();
            dispatch(audioActions.stopAudio)
        }
    }
    
    return (
        <View style={styles.screen}>
            {/* <Button title="Go Back" onPress={handleGoBack}/> */}
            <SearchBar onShowBirds={handleOnShowBirds}/>
            <BirdCount onShowBirds={handleOnShowBirds}/>
            {/* {showMyBirdCount ? <Text>Count: {myBirds.length}</Text> : null} */}

            {isLoading ? <ActivityIndicator /> : null}
            {showBirds && currentBirds.length > 0 ? <BirdsList onShowBirds={handleOnShowBirds} {...props} birdList={currentBirds}/> : null}
            <CategoriesList onShowBirds={handleOnShowBirds}/>
            <NavigationEvents

                onWillBlur={handleLeaving}
            />
        </View>
    )
}

BirdODexScreen.navigationOptions = navData => {
    return {
        headerTitle: "BirdieDex",
        headerStyle: {
            backgroundColor: Platform.OS === "ios" ? Colors.myColor : "thistle",
            color: "black"
        },
        headerLeft: <HeaderButtons HeaderButtonComponent={MenuButton}>
            <Item title="Menu" iconName={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
                onPress={() => { navData.navigation.toggleDrawer() }} />
        </HeaderButtons>,
        headerRight: (<Image style={{ width: 25, height: 25 }} source={require("../assets/images/birdicon.png")} />)
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
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
    },
    category: {
        borderBottomColor: "black",
        borderBottomWidth: 10,
        backgroundColor: Colors.myColor
    }
})

export default BirdODexScreen;