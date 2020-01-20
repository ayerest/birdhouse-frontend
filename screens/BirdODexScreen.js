import React, { useState} from 'react';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import Colors from '../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import { MenuButton } from '../components/MenuButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import SearchBar from '../components/SearchBar';
import BirdsList from '../components/BirdsList'
import BirdCount from '../components/BirdCount';
import CategoriesList from '../components/CategoriesList';
import { NavigationEvents } from 'react-navigation';
import * as audioActions from '../store/actions/audio';
import AvatarButton from '../components/AvatarButton'

const BirdODexScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [showBirds, setShowBirds] = useState(false);
    const [currentBirds, setCurrentBirds] = useState([]);
    const dispatch = useDispatch();
    
    const filteredBirds = useSelector(state => {
        return state.birds.filteredBirds;
    })
    
    const myBirds = useSelector(state => {
        return state.birds.myBirds;
    })
    
    
    const categoryBirds = useSelector(state => {
        return state.birds.categoryBirds;
    })
    
    const handleOnShowBirds = async (type) => {
        setIsLoading(true);
        setCurrentBirds([]);
        setShowBirds(false);
        switch(type) {
            case false:
                setCurrentBirds([]);
                setShowBirds(false);
                setIsLoading(false);
                return;
            case "mine":
                if (audio) {
                    await audio.stopAsync();
                    dispatch(audioActions.stopAudio);
                }
                setCurrentBirds(myBirds);
                setShowBirds(true);
                setIsLoading(false);
                return;
            case "search":
                setCurrentBirds(filteredBirds);
                setShowBirds(true);
                setIsLoading(false);
                return;
            case "category":
                setCurrentBirds(categoryBirds);          
                setShowBirds(true);
                setIsLoading(false);
                return;
            default:
                return;
        }
    }

    const audio = useSelector(state => {
        return state.audio.currentSound;
    })

    const handleLeaving = async () => {
        if (audio) {
            await audio.stopAsync();
            dispatch(audioActions.stopAudio);
        }
    }
    
    return (
        <View style={styles.screen}>
            <SearchBar onShowBirds={handleOnShowBirds}/>
            <BirdCount onShowBirds={handleOnShowBirds}/>

            {isLoading ? <ActivityIndicator size="large" color={Colors.linkColor} /> : null}
            {showBirds && currentBirds.length > 0 ? <BirdsList onShowBirds={handleOnShowBirds} {...props} birdList={currentBirds}/> : null}
            <CategoriesList onShowBirds={handleOnShowBirds}/>
            <NavigationEvents
                onWillBlur={handleLeaving}
            />
        </View>
    )
}

BirdODexScreen.navigationOptions = navData => {
    let leftOption = (<HeaderButtons HeaderButtonComponent={MenuButton}>
        <Item title="Menu" iconName={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
            onPress={() => { navData.navigation.toggleDrawer() }} />
    </HeaderButtons>)
    return {
        headerTitle: "BirdieDex",
        headerStyle: {
            backgroundColor: Platform.OS === "ios" ? Colors.myColor : "thistle",
            color: "black"
        },
        headerLeft: leftOption,
        headerRight: (
            <AvatarButton handleClick={() => {
                navData.navigation.navigate({
                    routeName: 'MyAccount', params: {
                    }
                })
            }} />
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    category: {
        borderBottomColor: "black",
        borderBottomWidth: 10,
        backgroundColor: Colors.myColor
    },
    
})

export default BirdODexScreen;