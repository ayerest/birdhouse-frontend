import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'uuid';
import * as birdsActions from '../store/actions/birds';
import { Entypo } from '@expo/vector-icons';


const CategoriesList = (props) => {
    const [currentCategory, setCurrentCategory] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        const loadCategories = async () => {
            await dispatch(birdsActions.fetchBirdCategories());
        }
        loadCategories();
    }, []);


    const categoryList = useSelector(state => {
        return state.birds.birdCategories
    }) 

    const setCategory = async (category) => {
        await setCurrentCategory(category)
        // getBirds();
        // !!currentCategory ? getBirds() : getBirds(category)
    }
    
    const getBirds = async () => {
            try {
                setIsLoading(true)
                await dispatch(birdsActions.fetchBirds(currentCategory));
                props.onShowBirds("category")
                setIsLoading(false)
                setCurrentCategory(null)
            } catch (err) {
                console.log(err)
                setIsLoading(false)
                setCurrentCategory(null)
            }
    }
    useEffect(() => {

        getBirds()
    }, [currentCategory])

    const renderCategoryItem = (categoryItem) => {
        return (
            <TouchableOpacity style={styles.category} onPress={() => setCategory(categoryItem.item)}>
                <Text style={styles.text}>{categoryItem.item}</Text>
                <Entypo name="plus" color={"green"} size={20} />
            </TouchableOpacity>
        )
    }

    return (
        <View>
            {/* <Text>Categories</Text> */}
            {isLoading && !!currentCategory ? <ActivityIndicator /> : null}
            <FlatList keyExtractor={(item, index) => uuid()} data={categoryList} renderItem={renderCategoryItem}
                numColumns={1} />
        </View>
    )
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
    text: {
        color: "black",
        alignSelf: "center",
        fontFamily: 'Roboto-Condensed',
        fontSize: 16
    },
    category: {
        flexDirection: "row",
        justifyContent: "flex-start",
        borderColor: "black",
        borderBottomWidth: 2,
        backgroundColor: Colors.myColor,
        padding: 8
    }
})

export default CategoriesList;