import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'uuid';
import * as birdsActions from '../store/actions/birds'

const CategoriesList = (props) => {
    const [currentCategory, setCurrentCategory] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        const loadCategories = async () => {
            await dispatch(birdsActions.fetchBirdCategories());
        }
        loadCategories();
    }, [dispatch]);


    const categoryList = useSelector(state => {
        return state.birds.birdCategories
    }) 

    const setCategory = (category) => {
        // console.log(category, "setting the category")
        setCurrentCategory(category)
        // console.log("current category", currentCategory)
        getBirds(category)
    }

    const getBirds = async (category) => {
        try {
            await dispatch(birdsActions.fetchBirds(category));
            props.onShowBirds("category")
        } catch (err) {
            console.log(err)
        }
        
    }

    const renderCategoryItem = (categoryItem) => {
        return (
            <View style={styles.category}>
                <Text style={styles.text}>{categoryItem.item}</Text>
                <Button title="+" onPress={() => setCategory(categoryItem.item)} />
            </View>
        )
    }

    return (
        <View>
            <Text>Categories</Text>
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
        alignSelf: "center"
    },
    category: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderColor: "black",
        borderBottomWidth: 2,
        backgroundColor: Colors.myColor
    }
})

export default CategoriesList;