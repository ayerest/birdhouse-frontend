import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { View, Text, StyleSheet, Platform, FlatList, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MenuButton from '../components/MenuButton';
import Colors from '../constants/Colors';
import * as photosActions from '../store/actions/photos';
import uuid from 'uuid'

const PicturesScreen = props => {

    const dispatch = useDispatch();

    useEffect(() => {
        const loadMyPhotos = async () => {
            dispatch(photosActions.getMyPhotos());
        }
        loadMyPhotos();
    }, [dispatch, photosList]);

    const photosList = useSelector(state => {
        return state.photos.myPhotos
    })

    const renderPhotoItem = (image) => {
        console.log("---------------------")
        console.log(image, "what do i have access to?")
        return (
            <Image style={styles.image} source={{uri: image.item.img_url}}/>
        )
    }
    //note to self: this really should be a carousel with thumbnail images
    return (
        <View style={styles.screen}>

            <Text>The Photos Screen!</Text>
            {photosList.length > 0 ? <FlatList keyExtractor={(item, index) => uuid()} data={photosList} renderItem={renderPhotoItem} numColumns={2} /> : <Text>You haven't taken any photos yet!</Text>}
        </View>
    )
}


PicturesScreen.navigationOptions = navData => {
    return {
        headerTitle: "My Photos",
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 200,
        width: 300
    }
})

export default PicturesScreen;