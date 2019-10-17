import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { View, Text, StyleSheet, Platform, FlatList, Image, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MenuButton from '../components/MenuButton';
import Colors from '../constants/Colors';
import * as photosActions from '../store/actions/photos';
import uuid from 'uuid'

const PicturesScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadMyPhotos = async () => {
            setIsLoading(true);
            await dispatch(photosActions.getMyPhotos());
            setIsLoading(false)
        }
        loadMyPhotos();
    }, [dispatch, photosList]);

    const photosList = useSelector(state => {
        return state.photos.myPhotos
    })

    const renderPhotoItem = (image) => {
        // console.log("---------------------")
        // console.log(image, "what do i have access to?")
        return (
            <Image style={styles.image} source={{uri: image.item.img_url}}/>
        )
    }
    //note to self: this really should be a carousel with thumbnail images
    return (
        <View style={styles.screen}>

            {!isLoading && photosList.length == 0 ? <Text>You haven't taken any photos yet!</Text> : null}
            {isLoading ? <ActivityIndicator size="large" /> : <FlatList keyExtractor={(item, index) => uuid()} data={photosList} renderItem={renderPhotoItem} numColumns={1} />}

            {/* <Text>The Photos Screen!</Text>
            {photosList.length > 0 ? <FlatList keyExtractor={(item, index) => uuid()} data={photosList} renderItem={renderPhotoItem} numColumns={1} /> : <Text>You haven't taken any photos yet!</Text>} */}
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
        </HeaderButtons>,
        headerRight: (<Image style={{ width: 25, height: 25 }} source={require("../assets/images/birdicon.png")} />)
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 300,
        width: 300,
        marginBottom: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "black"
    }
})

export default PicturesScreen;