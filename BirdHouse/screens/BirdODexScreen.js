import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Colors from '../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import * as birdsActions from '../store/actions/birds';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {MenuButton} from '../components/MenuButton';
import BirdCard from '../components/BirdCard';
import uuid from 'uuid';
import SearchBar from '../components/SearchBar';
import BirdsList from '../components/BirdsList'



const BirdODexScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState();
    const [showBirds, setShowBirds] = useState(false)
    // const [filteredBirds, setFilteredBirds] = useState([])
    const dispatch = useDispatch();
    
    useEffect(() => {
        const loadCategories = async () => {
            setError(null);
            setIsLoading(true);
            try {
                dispatch(birdsActions.fetchBirdCategories());
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        }
        loadCategories();
    }, [dispatch]);

    // useEffect(() => {
    //     const listener = props.navigation.addListener('willFocus', loadCategories);
    //     return () => {
    //         listener.remove();
    //     }
    // }, [loadCategories])
    
    
    const categoryList = useSelector(state => {
        return state.birds.birdCategories
    })

    const birdList = useSelector(state => {
        return state.birds.categoryBirds
    })

    const filteredBirds = useSelector(state => {
        // console.log("filtered birds in birdodex", state.birds.filteredBirds)
        return state.birds.filteredBirds
    })

    const renderBirdGridItem = (bird) => {
        {/* <TouchableOpacity
            style={styles.gridItem}
            onPress={() => {props.navigation.navigate({routeName: 'BirdDetails', params: {
                birdId: bird.item.id.toString()
            }})}}> */}
            {/* </TouchableOpacity> */}
        // console.log("what bird info do I have access to", bird)
        // console.log("------------------------------------------")
            return (
                    
            
                 <BirdCard bird={bird} key={bird.item.id.toString()} common_name={bird.item.common_name} scientific_name={bird.item.species_name} onPress={() => {
                    props.navigation.navigate({
                        routeName: 'BirdDetails', params: {
                            birdName: bird.item.common_name,
                            birdId: bird.item.id.toString(),
                            bird: bird
                        }
                    })
                }}/>
            
            )
        }
    if (error) {
        return <View style={styles.screen}><Text>An Error occurred!</Text>
        </View> 
    }
    if (isLoading) {
        return <View style={styles.screen}><ActivityIndicator size='large' color={Colors.tintColor}/></View>
    }


    const getBirds = async (category) => {
        setError(null);
        setIsLoading(true);
        setShowBirds(false);
        try {
            dispatch(birdsActions.fetchBirds(category));
            setIsLoading(false);
            setShowBirds(true)
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    }


    const renderCategoryItem = (categoryItem) => {
        return (
            <View key={uuid()} style={styles.category}>
                <Text>{categoryItem.item}</Text>
                <Button title="Show Birds" onPress={() => getBirds(categoryItem.item)}/>
            </View>
        )
    }
    
    // maxToRenderPerBatch --> prop that can be passed to flatlist
    return (
        <View style={styles.screen}>
            <Text>The BirdODex Screen!</Text>
            <SearchBar />
            {isLoading ? <View style={styles.screen}><ActivityIndicator size='large' color={Colors.tintColor} /></View> : null}
            {/* {!!filteredBirds && filteredBirds.length > 0 ? <FlatList key={uuid()} data={filteredBirds} renderItem={renderBirdGridItem} numColumns={1} /> : null } */}
            <BirdsList />
            <FlatList key={uuid()}data={categoryList} renderItem={renderCategoryItem}
            numColumns={1}/>
            {/* {showBirds ? <FlatList key={uuid()} data={birdList} renderItem={renderBirdGridItem}
                numColumns={2} /> : null} */}
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
    },
    category: {
        borderBottomColor: "black",
        borderBottomWidth: 10,
        backgroundColor: Colors.myColor
    }
})

export default BirdODexScreen;